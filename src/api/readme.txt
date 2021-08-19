This api folder "\src\readme.txt" contains imports of the restful apis defined in the backend application 

Functions
--------------------------------------------------------------------------
cart
addToCart:
This function is used to add products to a users shopping cart

Inputs(Arguments)
1. productId (String) - identifies a unique product item within the database
2. variant (Array)- receives an array from a products variants with details such as color & size

Output(Returns)
This function returns an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. message (string) - a string message returns an error message or a success message 


getCart:
This function is used to get the current users cart

Output(Returns)
This function return an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. data (array) - this array value returns the products stored in the cart
3. message(string) - a string message returns an error message if the ok value is false else no error message sends data

updateCartItemQuantity:
This function is used to update the quantity of specific product in a user's shopping cart

Inputs(Arguments)
1. product_id - identifies a unique product item with the database
2. option - its a shopping cart item surrogate key used as an identifier
3. newQuantity - the new quantity number set by user in the frontend

Output(Returns)
This function return an  that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. message(string) - a string message returns an error message if the ok value is false else no error message sends data

deleteSingleCartItem:
Used to delete a single item from a users cart
Inputs(Arguments)
1. product_id - identifies a unique product item with the database
2. option - its a shopping cart item surrogate key used as an identifier

Output(Returns)
This function return an object that can contains the following variables:
1. ok (boolean) - this notifies other functions it was a successful execution or a failed execution
2. data (array) - this array value returns the cart object & the cart summary details
3. message(string) - a string message returns an error message if the ok value is false else no error message sends data

------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------
index.js

-----------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------
products
getProducts:
The purpose of this function is retrieve products from the database based on a querry defined by the current user

Inputs(Arguments)
1. queryObject - This object contains variables that match fields within the database and instructions that are used to indicate which data fields to return, in order to find a matching document - Refer to Mongoose Documentation

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an array of product/inventory items that match the arguments supplied.

getProduct:
This function aims are getting a specific product/inventory item's details, filtering the data it returns based on the id it receives.

Inputs(Arguments)
1. productId (String) - Identifies a unique product item with the database.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.
3. data (object) - This variable contains an object with the details of the product that matches the arguments supplied.


------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------
reviews.js
sendAReview:
This function aims at creating new product reviews from the data it supplied through its arguments. 

Inputs(Arguments)
1. review (object) - This is an object that must contain a body (String) and rating (int) that make the core part of a customer's product review.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.


getReviewsByProductId:
This function aims at sourcing and returning all the customer reviews associated with a specific product.
This function scans through the reviews collection looking for reviews that contain a corresponding productId field.

Inputs(Arguments)
1. id (String) - Identifies a unique product item with the database.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides a success/error message depending on the outcome of the method call.
3. data (Array [object]) - This variable contains an object which will hold the reviews which match the product_id value supplied to this function.

deleteReviewByReviewId:
This function aims at deleting a single review stored (document) within the review collection.
This review is identified using its unique document id.

Inputs(Arguments)
1. id (String) - Identifies a unique product review within the collection of reviews.

Output(Returns)
This function returns an object that can contains the following variables:-
1. ok (boolean) - This is  a boolean value that will be set to "true" in the event that the function successfully executes.
2. message (String) - This variable provides an success/error message depending on the outcome of the method call.

------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------
users.js

updateUserDetails:
This function is to amend customer database collection
Inputs(Arguments)
1. data (string) - contains values of user when such as user name and other personal details 

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. error (string) - a string error or successful message 

getUserDetails:
This function gets information from the database from the user collection 

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. error (string) -a string error or successful message 
3. data (array) - array value of user object 

createNewUser:
This function creates a user and checks if user name exists in the mongoose database user collection --see Mongoose documentation 

Inputs(Arguments)
1. userData (string) - contains values of user when such as user name and other personal details  

Output(Returns):
1. ok (boolean) -this notifies other functions it was a successful execution or a failed execution 
2. message (string) -a string error or successful message 
---------------------------------------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------