# Assignment 2

## Project Overview

This project is a backend project created using javascript's library typescript and mongodb as database. It contains seven different routes to interact with the server. They are

1. Adding a product to the database. This is a post operation
   > > While creating a product, we have to pass those properties `name`,`brand`,`price`,`category`,`description` and `quantity`. The `inStock` property will be created on the fly based on the value of `quantity` field. and `createdAt` and `updatedAt` will be added automatically via mongoose library.
2. Getting all products from database. This is a get operation
   > > If we want to get all the product from database we just need to hit this link [Click Here](https://assignment2-chi-nine.vercel.app/api/products "Get all products")
3. Get a specific product based on productId. This is a get operation
4. Update a product based on productId. This is a put operation
5. Delete a product based on productId .This is a delete operation
6. Create an order. This is a post operation
7. Calculating Revenue from the orders placed. It is a get operation
