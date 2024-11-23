# Assignment 2

## Project Overview

This project is a backend project created using javascript's library typescript and mongodb as database. It contains seven different routes to interact with the server. They are

1. Adding a product to the database. This is a post operation
   > > While creating a product, we have to pass those properties `name`,`brand`,`price`,`category`,`description` and `quantity`. The `inStock` property will be created on the fly based on the value of `quantity` field. and `createdAt` and `updatedAt` will be added automatically via mongoose library.
2. Getting all products from database. This is a get operation
   > > If we want to get all the product from database we just need to hit this link [Get all products](https://assignment2-chi-nine.vercel.app/api/products "Get all products")
3. Get a specific product based on productId. This is a get operation
   > > If we want to get specific product based on the product id we have to click the following link and with the link we need to pass the product id. A sample product you will get by clicking the link provided here. [Click here to get a specific product with id `674139fd2e32f4754a2227d7` ](https://assignment2-chi-nine.vercel.app/api/products/674139fd2e32f4754a2227d7)
4. Update a product based on productId. This is a put operation
   > > Updating a product is very much similar to creating a product in the sense of keys are passed to the server. This is a put operation and need to pass all the keys needed to pass while creating a product. Those are `name`,`brand`,`price`,`category`,`description` and `quantity`. And here also `inStock` will be created on the fly based on the value of `quantity`.
5. Delete a product based on productId .This is a delete operation
   > > Deleting a product is super easy. Just need to hit the same rout to find a specific product with product id but with in delete operation.
6. Create an order. This is a post operation
   > > While creating an order we have to provide some fields with values. The fields are `email`, `product` and `quantity`. The `product` field here denotes an \_id of a product. If we provide a wrong value at `product` meaning the value does not exist on the product collection the order will not be created. Based on the `quantity` and products `price` which resides in products collection a field named `totalPrice` will be created and placed inside the order document.
7. Calculating Revenue from the orders placed. It is a get operation
   > > From all the orders revenue is calculated and to calculate this I've used aggregation of mongodb. [Calculate revenue](https://assignment2-chi-nine.vercel.app/api/orders/revenue)
8. Getting all the orders.
   > > An additional route is created here which is not required in the assignment. That is to get all the orders. [Get all orders](https://assignment2-chi-nine.vercel.app/api/orders)

# How to set the project locally

# `You need nodemon installed in your system to run my server locally`

> > To run the project locally you can execute the command `npm run start:dev`. I have written a script inside the package.json file so that this will run the server in you local system.
> > !!! **Don't run the project using ts-node-dev or some other libraries which run the typescript file. I have some issues with import syntax. I have fixed that and run my server locally from the `.js` files.**
