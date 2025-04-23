// utils/validateProductInput.js
export const validateProductInput = (data) => {
  const errors = [];

  // name: required string
  if (!data.name || typeof data.name !== "string") errors.push("name (must be a string)");
  if (!data.countInStock || typeof data.countInStock !== "number") errors.push("countInStock (must be a number)");

  // description: required string
  if (!data.description || typeof data.description !== "string") errors.push("description (must be a string)");

  // price: required number
  if (data.price === undefined || typeof data.price !== "number") errors.push("price (must be a number)");

  // sku: required string
  if (!data.sku || typeof data.sku !== "string") errors.push("sku (must be a string)");

  // category: required string
  if (!data.category || typeof data.category !== "string") errors.push("category (must be a string)");

  // sizes: required array of strings
  if (!Array.isArray(data.sizes) || data.sizes.length === 0 || !data.sizes.every(item => typeof item === "string"))
    errors.push("sizes (must be a non-empty array of strings)");

  // colors: required array of strings
  if (!Array.isArray(data.colors) || data.colors.length === 0 || !data.colors.every(item => typeof item === "string"))
    errors.push("colors (must be a non-empty array of strings)");

  // collections: required string
  if (!data.collections || typeof data.collections !== "string") errors.push("collections (must be a string)");

  // material: required string
  if (!data.material || typeof data.material !== "string") errors.push("material (must be a string)");

  // images: required array with at least one object that has a 'url' string
  if (
    !Array.isArray(data.images) ||
    data.images.length === 0 ||
    typeof data.images[0]?.url !== "string"
  )
    errors.push("images (must include at least one object with a 'url' string)");

  return errors;
};


export const validateProductUpdateInput = (data) => {
  const errors = [];

  if (data.name && typeof data.name !== "string") errors.push("name must be a string");
  if (data.description && typeof data.description !== "string") errors.push("description must be a string");
  if (data.price && typeof data.price !== "number") errors.push("price must be a number");
  if (data.sku && typeof data.sku !== "string") errors.push("sku must be a string");
  if (data.category && typeof data.category !== "string") errors.push("category must be a string");

  if (data.sizes && (!Array.isArray(data.sizes) || !data.sizes.every(i => typeof i === "string")))
    errors.push("sizes must be an array of strings");

  if (data.colors && (!Array.isArray(data.colors) || !data.colors.every(i => typeof i === "string")))
    errors.push("colors must be an array of strings");

  if (data.collections && typeof data.collections !== "string") errors.push("collections must be a string");
  if (data.material && typeof data.material !== "string") errors.push("material must be a string");

  if (data.images && (!Array.isArray(data.images) || typeof data.images[0]?.url !== "string"))
    errors.push("images must be an array with at least one object containing 'url'");

  return errors;
};
