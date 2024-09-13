## Welcome to the code test!

The `/be` directory in this repo is a slightly modified express-generator based webserver intended to act as a very simple api. For the purpose of this code test you will only have to adjust the `/routes/products.js` file though feel free to add or modify files if you see fit.

You may notice some "extra" packages in the `package.json` file, pre-populated tests and db connection code. Leave this all in the repo but you won't be using it for this part of the test.

In 2 days please complete the following tasks. If you do not have time to get through all tasks please submit what you have complete and we will review what is there and get back to you. 

Tasks:
1. Adjust the existing function under `/products` to return all the product data in the `/data/products.js` file.

2. Write a new route that takes the characteristic as a query parameter and returns a list of products with that characteristic. Note that when evaluating this route we will assume this is functioning at scale so take performance at scale into account.

3. Write a new route that returns a list of products with a score associated with each product. The score will be based on characteristic composition. Characteristics "Humane", "Locally Produced", "Healthy" are worth 1 point, "Plastic-Free" is worth 2 points, "Unhealthy" and "Wasteful" are -1 point each. Once again assume performance at scale if you can and use any method you see fit to make the endpoint more performant.

4. Submit a pull request to this repo with your answers and email edwardgaudio@gmail.com to indicate the test is complete.

Thank you for your time. We really appreciate you taking the time to complete the test and hope it is not too much of a burden. Regardless of the outcome, good luck with your job search!

__Edward Gaudio__


---

# Answers 
The following are the steps to install, test, and explain the solutions to the tasks above.

## Installation
1. Create a local postgres database. If on Mac, run `createdb products`. (You may need to install `postgresql` from `brew`, then start the `postgresql` service with `brew services start postgresql` if you haven't already. You also may need to adjust the environment variables in `.env` depending on your system setup - my db username was `aamir` and the password was empty)
2. Navigate to the `be` directory and run `npm install` to install all of the necessary packages.
3. Next, run `knex migrate:up 20240912183057_products.js` and `knex migrate:up 20240912205838_product_characteristics.js` to create the correct schema. You may need to install `knex` globally with `npm install -g knex`. Don't specify the relative directory because the specific directory is already specified in `knexfile.js`.
4. Now, seed the database with `knex seed:run --specific=04_products_characteristics_seeds.js` This will populate the `products` database with the data from `be/data`, which consists of the products and characteristic scores.
5. Run the server with `node app.js`


## Testing the task solutions
To test Task #1, navigate to `localhost:3001/products`. 
To test Task #2, navigate to `localhost:3001/products/characteristics?c1=Wasteful`. Replace `Wasteful` with other characteristics to test the endpoint. 
To test Task #3, navigate to `localhost:3001/products/scores`.

## Explanation of changes
Task To run the project, please navigate to the be directory and run #1 is accomplished with the /products endpoint. It was created quickly without regards to scale.
Task #2 is accomplished with the /products/characteristics endpoint, which requires a characteristic passed as a query param named c1 to retrieve all products with a particular characteristic.
Task #3 is accomplished by the /products/scores endpoint
I ended up using postgres + knex to store the product and characteristics data into three tables: products, characteristics, and product_characteristics. This junction table allowed for quick sums for scores across multiple characteristics and products.

I wrote two migrations and seeded them both (in the db/migrations and db/seeds). The first migration naively put everything into one table which worked fine for Task #2, and I shifted to the three table approach for efficiency when I got to Task #3.

To seed the characteristics and product_characteristics tables, I put the characteristics tables into its own data file in data/characteristics.

The rest of the files are config files or aftereffects of installing packages.