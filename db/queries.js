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

const dbAddItem = async (name, category_id, quantity, added_by) => {
  await pool.query(
    "INSERT INTO items (name, category_id, quantity, added_by) VALUES ($1, $2, $3, $4)",
    [name, category_id, quantity, added_by]
  );
};

const dbDeleteItem = async (itemId) => {
  await pool.query("DELETE FROM items WHERE id = $1", [itemId]);
};

const dbUpdateItem = async (itemId, name, category_id, quantity, added_by) => {
  await pool.query(
    "UPDATE items SET name = $1, category_id = $2, quantity = $3, added_by = $4 WHERE id = $5",
    [name, category_id, quantity, added_by, itemId]
  );
};

// categories

const dbGetAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
};

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
const dbAddCategory = async (name) => {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
};

const dbDeleteCategory = async (categoryId) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);
};

const dbUpdateCategory = async (categoryId, name) => {
  await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
    name,
    categoryId,
  ]);
};

module.exports = {
  dbGetAllItems,
  dbGetItem,
  dbGetItemCategory,
  dbGetAllItemsByCategory,
  dbGetAllCategories,
  dbAddItem,
  dbDeleteItem,
  dbUpdateItem,
  dbUpdateCategory,
  dbAddCategory,
  dbDeleteCategory,
  dbGetCategoryById,
};
