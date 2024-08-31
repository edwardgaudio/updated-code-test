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