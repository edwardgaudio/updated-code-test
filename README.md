## Welcome to the code test!

In this respository you have two directories
`/be` for "backend" and `fe` for "frontend".

The backend directory is a slightly modified express-generator based webserver intended to act as a very simple api. For the purpose of this code test you will only have to adjust the `/routes/products.js` file though feel free to add or modify files if you see fit.

The frontend directory is an unmodified create-react-app frontend.

In 4 days please complete the following tasks. If you do not have time to get through all tasks please submit what you have complete and we will review what is there and get back to you. I suggest if you can't get though all 5 tasks you skip either task 3 or 4.

Tasks:
1. On the backend, adjust the existing function under `/products` to return all the product data in the `/data/products.js` file.

2. On the backend, write a new route that takes the characteristic as a query parameter and returns a list of products with that characteristic. Note that when evaluating this route we will assume this is functioning at scale so take performance at scale into account.

3. On the backend, write a new route that returns a list of products with a score associated with each product. The score will be based on characteristic composition. Characteristics "Humane", "Locally Produced", "Healthy" are worth 1 point, "Plastic-Free" is worth 2 points, "Unhealthy" and "Wasteful" are -1 point each. Once again assume performance at scale if you can and use any method you see fit to make the endpoint more performant.

4. On the frontend, using `/src/App.js` as a starting point, build a tiny front-end that allows you to select a characteristic from a select box. When the characteristic is selected the application will call out to the backend application and grab a list of products matching that characteristic the selected characteristic. Please use react hooks(<a href="https://reactjs.org/docs/hooks-intro.html">docs</a>) to accomplish this task.

5. Submit a pull request to this repo with your answers and email edward@joinethically.com to indicate the test is complete.

Thank you for your time. We really appreciate you taking the time to complete the test and hope it is not too much of a burden. Regardless of the outcome, good luck with your job search!

__Edward Gaudio__