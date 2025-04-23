import Product from "../Models/Product.js";
import {
  validateProductInput,
  validateProductUpdateInput,
} from "../Utils/ProductValidation.js";

async function createProduct(req, res) {
  try {
    const { id: userId } = req.user; // Fixed destructuring
    // Validate required fields
    const missingFields = validateProductInput(req.body);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const { sku } = req.body;

    // Check for unique SKU
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "SKU already exists",
      });
    }

    // Create and save the product
    const product = new Product({
      ...req.body,
      user: userId, // Associate product with the user
    });

    const createdProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    console.log("Create Product Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id: userId } = req.user;
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (existingProduct.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this product",
      });
    }

    const missingFields = validateProductUpdateInput(req.body);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id: userId } = req.user;
    const { productId } = req.params;
    if (!productId) {
      return res.status(404).json("productId not provide");
    }
    const isProductExist = await Product.findById(productId);
    if (!isProductExist) {
      return res.status(404).json("Product not exist");
    }
    if (isProductExist.user.toString() !== userId) {
      return res.status(409).json("You are not authorized");
    }
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//  route /product
//fetch all data with optional filters
async function getAllProduct(req, res) {
  try {
    const {
      sizes,
      brand,
      category,
      gender,
      colors,
      material,
      minprice,
      maxprice,
      sortby,
      search,
      limit,
      collections,
    } = Object.fromEntries(
      Object.entries(req.query).map(([key, val]) => [key.toLowerCase(), val])
    );

    const query = {};

    // Filter: collection
    if (collections && collections.toLowerCase() !== "all") {
      query.collections = collections;
    }

    // Filter: category
    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    // Filter: material
    if (material) {
      query.material = { $in: material.split(",").map((m) => m.trim()) };
    }

    // Filter: sizes
    if (sizes) {
      query.sizes = { $in: sizes.split(",").map((s) => s.trim()) };
    }

    // Filter: brand
    if (brand) {
      query.brand = { $in: brand.split(",").map((b) => b.trim()) };
    }

    // Filter: colors
    if (colors) {
      query.colors = { $in: colors.split(",").map((c) => c.trim()) };
    }

    // Filter: gender
    if (gender) {
      query.gender = gender;
    }

    // Filter: price
    if (minprice || maxprice) {
      query.price = {};
      if (minprice) query.price.$gte = Number(minprice);
      if (maxprice) query.price.$lte = Number(maxprice);
    }

    // Filter: search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sort = {};
    if (sortby) {
      switch (sortby.toLowerCase()) {
        case "priceAsc":
          sort.price = 1;
          break;
        case "priceDes":
          sort.price = -1;
          break;
        case "popularity":
          sort.rating = -1;
          break;
      }
    }

    // Fetch products
    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


//best seller
async function bestSellerProduct(req, res) {
  try {
    const bestSellers = await Product.find({}).sort({ rating: -1 }) // Top 10 best sellers

    if (bestSellers.length === 0) {
      return res.status(404).json({ success: false, message: "No best sellers found" });
    }

    return res.status(200).json({ success: true, data: bestSellers });
  } catch (error) {
    console.error("Error fetching best seller products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

//new arrivals 

async function newArrivalProduct(req, res) {
  try {
    const newArrivals = await Product.find({}).sort({ createdAt: -1 }).limit(8)// Top 10 best sellers

    if (newArrivals.length === 0) {
      return res.status(404).json({ success: false, message: "No best sellers found" });
    }

    return res.status(200).json({ success: true, data: newArrivals });
  } catch (error) {
    console.error("Error fetching best seller products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
async function getSingleProduct(req, res) {
  try {
    const { id:productId } = req.params;
    if (!productId) {
      return res.status(404).json("productId not provide");
    }
    const fetchedProduct = await Product.findById(productId);
    if (!fetchedProduct) {
      return res.status(404).json("Product not exist");
    }
    return res.status(200).json({
      success: true,
      message: "product fetch success",
      data: fetchedProduct,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


//get similar products

async function similarProduct(req, res) {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ success: false, message: "productId not provided" });
    }


  

    const fetchedProduct = await Product.findById(productId);
    if (!fetchedProduct) {
      return res.status(404).json({ success: false, message: "Product does not exist" });
    }

    //similar product
    const similarProduct = await Product.find({
      _id: { $ne: fetchedProduct.id },
      category: fetchedProduct.category,
      gender: fetchedProduct.gender,
    }).limit(4);
 
    return res.status(200).json({
      success: true,
      message: "Similar products fetched successfully",
      data: similarProduct,
    });
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


export { createProduct, updateProduct, deleteProduct, getAllProduct ,getSingleProduct,similarProduct,bestSellerProduct,newArrivalProduct};
