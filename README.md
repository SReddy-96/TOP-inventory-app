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
  - `/categories/:id`
  - `/categories/new`
  - `/categories/:id/update`
  - `/categories/:id/delete`
  - `item/:id`
  - `/item/new`
  - `/item/:id/update`
  - `/item/:id/delete`

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

  Need to use `express-validator` to sanitise and check the form inputs.
