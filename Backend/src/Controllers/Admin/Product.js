import Product from "../../Models/Product.js";
async function getProduct(req,res) {
  try {
    const product = await Product.find({});
    if(product.length===0){
      return res.status(404).json("product not found")
    }
    return res.status(200).json(product)
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
export default getProduct