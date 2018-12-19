# storeAPI
REST API to manage PRODUCTS and ORDERS, using public VAT API to get country tax rates.

## Endpoint for PRODUCTS
	Each product have name, category, price
	The API support getting all products, adding a product, editing a product, deleting a product

## Endpoint for ORDERS
	Each order should have a date, products list (product ids) and status (Pending, Processing, Delivered, Cancelled)
	The API should support getting all orders, adding an order (date should be automatically populated), change order status

## Authentication
	A request is send with username and password
  Retrieving all PRODUCTS is allowed for anonymous users
  Relevant status code is send if token is not provided or is invalid/expiredс

## Instalation

### Pull the repository

### Run `npm install`

### Run `npm start`
