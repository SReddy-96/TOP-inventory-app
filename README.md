# TOP Inventory App - ShopSort

## Summary

A smart shopping list application that helps you organize items by categories, track spending, and never forget essential items.

## Model

## Notes

- Controller
  - indexController.js
- Routes
  - indexRouter.js
  - newRouter.js
  - itemRouter.js
- Views
  - index.ejs
  - item.ejs
  - newItem.ejs
  - newCategory.ejs
- db
  - Pool.js
  - populatedb.js
  - itemQueries.js - createItem - getAllItems - getItemById - updateItem - deleteItem - GetAllItemsByCategory
    categoryQueries.js - createCategory - getAllCategories - getCategoryById - updateCategory - deleteCategory
- app.js
  - `/`
  - `/category/:id`
  - `/new/item`
  - `/new/category`
  - `/item/:id`

user can CRUD items
user can CRUD categories
user can get all items of one category
split all items into category when showing all items
when delete category, just delete category from item so find items in that category and change the category to "". make sure to have a clause if the category is an empty string.

- item

  - id primary key
  - name
  - category (foreign key from category table)
  - date
  - quantity
  - added by

- category
  - id primary key
  - name
