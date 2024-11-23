# Assignment 2

## Project Overview

This project is a backend project created using javascript's library typescript and mongodb as database. It contains seven different routes to interact with the server. They are

1. [Adding a product to the database. This is a post operation](https://assignment2-chi-nine.vercel.app/api/products)
   > > While creating a product, we have to pass those properties `name`,`brand`,`price`,`category`,`description` and `quantity`. The `inStock` property will be created on the fly based on the value of `quantity` field. and `createdAt` and `updatedAt` will be added automatically via mongoose library.
2. [Getting all products from database. This is a get operation](https://assignment2-chi-nine.vercel.app/api/products)
3. [Get a specific product based on productId. This is a get operation](https://assignment2-chi-nine.vercel.app/api/products/674139fd2e32f4754a2227d7 "The id provided here is a sample id")
4. [Update a product based on productId. This is a put operation](https://assignment2-chi-nine.vercel.app/api/products/674139fd2e32f4754a2227d7 "The id provided here is a sample id")
5. [Delete a product based on productId .This is a delete operation](https://assignment2-chi-nine.vercel.app/api/products/6741480be6ec17264c563f4e "The id provided here is a sample id")
6. [Create an order. This is a post operation](https://assignment2-chi-nine.vercel.app/api/orders)
7. [Calculating Revenue from the orders placed. It is a get operation ](https://assignment2-chi-nine.vercel.app/api/orders/revenue)
