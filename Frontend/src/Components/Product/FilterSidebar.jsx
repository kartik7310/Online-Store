import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0 - 100]);
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    gender: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maximumPrice: 100,
  });

  const category = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const size = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brand = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Male", "Women"];
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      gender: params.gender || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],

      brand: [],
      minPrice: 0,
      maximumPrice: 100,
    });

    setPriceRange([0 - params.maximumPrice || 100]);
  }, [searchParams]);

  function handleFilterChange(e) {
    const { name, value, type, checked } = e.target;
    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item != value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateUrl(newFilters);
  }

 function updateUrl(newFilters) {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
      setSearchParams(params);
      navigate(`?${params.toString()}`);
    });
  };

  function handlePrice(e){
    const newPrice = e.target.value;
    setPriceRange([0,newPrice])
    const newFilters = {...filters,minPrice:0,maxPrice:newPrice}
    setFilters(filters)
    updateUrl(newFilters)
  }
  return (
    <div className="p-4">
      <h3 className="text-gray-800 text-xl font-medium mb-4">Filters</h3>
      {/* category filters */}
      <div className="mb-6 ">
        <label className="block text-gray-500 font-medium mb-2">Category</label>
        {category.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              checked={filters.category===category}
              value={category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
      {/* gender filter */}
      <div className="mb-6">
        <label className="block text-gray-500 font-medium mb-2 ">Gender</label>
        {genders.map((gender) => (
          <div className="mb-1 flex flex-items-center">
            <input
              type="radio"
              name="gender"
              checked={filters.gender===gender}
              value={gender}
              onChange={handleFilterChange}
              className="text-blue-500 focus:ring-blue-400 mr-2 h-4 w-4 border-gray-400"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>
      {/* color section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-6 h-6 rounded-full border-black cursor-pointer transition hover:scale-105${filters.color===color?"ring-2 ring-blue-500":""}`}
              style={{ backgroundColor: color.toLocaleLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* sizes */}
      <div className="mb-6">
        <label className="block  text-gray-500 font-medium mb-2 ">Size</label>
        {size.map((size) => (
          <div className="text-gray-500">
            <input
              type="checkbox"
              name="size"
              checked={filters.size.includes(size)}
              value={size}
              onChange={handleFilterChange}
              className="text-blue-500 focus:ring-blue-400 mr-2 h-4 w-4 border-gray-400"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/* Materials*/}
      <div className="mb-6">
        <label className="block  text-gray-500 font-medium mb-2 ">
          Materials
        </label>
        {materials.map((material) => (
          <div className="text-gray-500">
            <input
              type="checkbox"
              name="material"
              checked={filters.material.includes(material)}
              value={material}
              onChange={handleFilterChange}
              className="text-blue-500 focus:ring-blue-400 mr-2 h-4 w-4 border-gray-400"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>
      {/* brand */}
      <div className="mb-6">
        <label className="block  text-gray-500 font-medium mb-2 ">Brands</label>
        {brand.map((brand) => (
          <div className="text-gray-500">
            <input
              type="checkbox"
              name="brand"
              checked={filters.brand.includes(brand)}
              value={brand}
              onChange={handleFilterChange}
              className="text-blue-500 focus:ring-blue-400 mr-2 h-4 w-4 border-gray-400"
            />
            <span className="text-gray-700 ">{brand}</span>
          </div>
        ))}
        {/* price range */}
        <div className="mb-8">
          <label className="block text-gray-600 font-medium mb-2 ">Price</label>
          <input
            type="range"
            name="priceRange"
            
            value={priceRange[1]}
            onChange={handlePrice}
            
            max={100}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-gray-600 mt-2">
            <span>$0</span>
            <span>${priceRange}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
