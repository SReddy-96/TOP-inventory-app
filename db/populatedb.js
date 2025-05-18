#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

async function main(dbUrl) {
  console.log("🌱 Checking database...");
  const client = new Client({
    connectionString: dbUrl,
  });

  try {
    await client.connect();

    // Check if tables exist
    const tableCheck = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'item'
      );
    `;

    const { rows } = await client.query(tableCheck);

    if (rows[0].exists) {
      // Only check for data if tables exist
      const countCheck = await client.query("SELECT COUNT(*) FROM item");
      if (countCheck.rows[0].count > 0) {
        console.log("✅ Database already populated, skipping seed");
        return;
      }
    }

    // If tables don't exist or are empty, run the seed
    const SQL = `
-- Create Category table
CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL
);

-- Create Item table
CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  category_id INTEGER REFERENCES category(id),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  quantity INTEGER DEFAULT 1,
  added_by VARCHAR(100) NOT NULL
);

-- Insert Categories
INSERT INTO category (name) VALUES
  ('Dairy'),
  ('Fruit'),
  ('Vegetables'),
  ('Meat'),
  ('Pantry');

-- Insert Items
INSERT INTO item (name, category_id, quantity, added_by) VALUES
  ('Milk', 1, 2, 'Steve'),                    -- Dairy
  ('Cheese', 1, 1, 'Sarah'),                  -- Dairy
  ('Apples', 2, 6, 'John'),                   -- Fruit
  ('Bananas', 2, 1, 'Sarah'),                 -- Fruit
  ('Carrots', 3, 2, 'Steve'),                 -- Vegetables
  ('Broccoli', 3, 1, 'Mike'),                 -- Vegetables
  ('Chicken', 4, 1, 'Sarah'),                 -- Meat
  ('Ground Beef', 4, 2, 'John'),              -- Meat
  ('Pasta', 5, 3, 'Steve'),                   -- Pantry
  ('Rice', 5, 2, 'Sarah');                    -- Pantry
`;

    await client.query(SQL);
    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  } finally {
    await client.end();
  }
}

const dbUrl = process.argv[2];
if (!dbUrl) {
  console.error("Please provide a database URL");
  process.exit(1);
}

main(dbUrl).catch((err) => {
  console.error(err);
  process.exit(1);
});
