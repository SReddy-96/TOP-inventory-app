const pool = require("./pool");

// items

const dbGetAllItems = async () => {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
};

const dbGetItem = async (itemId) => {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [
    itemId,
  ]);
  return rows[0];
};

// categories 

const dbGetAllCategories = async () => {  
  const {rows}= await pool.query("SELECT * FROM categories");
  return rows;
}

const dbGetItemCategory = async (categoryId) => {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    categoryId,
  ]);
  return rows[0];
};

const dbGetCategoryById = async (categoryId) => {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    categoryId,
  ]);
  return rows[0];
};

const dbGetAllItemsByCategory = async (categoryId) => {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1",
    [categoryId]
  );
  return {
    category: await dbGetCategoryById(categoryId),
    items: rows,
  };
};

module.exports = {
  dbGetAllItems,
  dbGetItem,
  dbGetItemCategory,
  dbGetAllItemsByCategory,
  dbGetAllCategories,
};
