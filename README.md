# teebay-buy-sell-rent-products-fullstack
A web application in which users can register themselves to advertise product they want to sell, or to buy/ rent products from other users. 

### Installation Guideline [BACKEND]:
In the /Server folder:
* `npm i`
* `npm run build`
* `INSTALL PRISMA & PRISMA CLIENT`
* `CREATE DBS CALLED teebaydb`
* `CONNECT DBS AS PRISMA DOCUMENTATION (check env-copy file, create .env and paste the content there)`
* `npm prisma migrate dev --name <NAME YOUR MIGRATION>`
* `npm run seed` This will automatically generate the Category table's content

## User
### Routes

*   **POST /user/registerUser**
*   **POST /user/loginUser**
*   **GET /user/getUser/:userID**

* * *

### Functionalities

*   **User Registration**
    
    *   Validates the incoming request body data using a predefined schema.
    *   Throws a 400 error if validation fails.
    *   Checks if the provided email is already registered; if yes, throws a 409 conflict error.
    *   Hashes the password using bcrypt.
    *   Creates a new user in the database.
    *   Returns a success message with the created user's ID.
*   **User Login**
    
    *   Validates the incoming request body data using a predefined schema.
    *   Throws a 400 error if validation fails.
    *   Checks if the user with the provided email exists; if not, throws a 404 error.
    *   Compares the provided password with the hashed password stored in the database.
    *   Generates a JWT token with user information.
    *   Returns the token along with the user information upon successful login.
*   **Get User Information**
    
    *   Extracts the userID from the request parameters.
    *   Checks if the provided userID is a valid number; if not, throws a 400 error.
    *   Retrieves user information from the database based on the userID.
    *   Returns the user's email and name if the user exists; otherwise, throws a 404 error.

* * *

### Errors

*   **400 Bad Request**
    
    *   Occurs when the request body fails validation or the provided userID is not a valid number.
*   **404 Not Found**
    
    *   Occurs when attempting to register a user with an email that is already registered or when trying to log in with an unregistered email or when retrieving user information with a non-existent userID.
*   **409 Conflict**
    
    *   Occurs when a user tries to register with an email that is already registered or when the provided password during login does not match the stored password.
*   **500 Internal Server Error**
    
    *   Occurs for any other unexpected errors during the execution of the controller methods.

## Product
### Routes

*   **POST /product/createProduct/:userID**
*   **POST /product/getProductList**
*   **GET /product/getProductList/:userID**
*   **PUT /product/softDeleteProduct/:productID**

* * *

### Functionalities

*   **Create Product**
    
    *   Validates the incoming request body data using a predefined schema.
    *   Throws a 400 error if validation fails.
    *   Extracts product attributes from the validated data.
    *   Validates and extracts the userID from request parameters.
    *   Retrieves and validates the category JSON string from the request body.
    *   Ensures the product is associated with at least one category.
    *   Creates a new product in the database with associated categories.
    *   Returns a success message upon successful product creation.
*   **Get Products By Type**
    
    *   Validates the incoming request body data to ensure the correct type is provided.
    *   Throws a 400 error if validation fails.
    *   Retrieves a list of products based on the provided type (sell or rent).
    *   Filters products based on their availability (not sold or not retrieved).
    *   Retrieves associated categories for each product.
    *   Returns a list of products with their associated categories.
*   **Get Product List by User ID**
    
    *   Validates the userID parameter to ensure it is a valid number.
    *   Retrieves a list of products associated with the provided userID.
    *   Filters soft-deleted products.
    *   Retrieves associated categories for each product.
    *   Returns a list of products owned by the user with their associated categories.
*   **Soft Delete Product**
    
    *   Validates the productID parameter to ensure it is a valid number.
    *   Soft deletes the product by updating its `softdelstat` field to `true`.
    *   Returns a success message upon successful soft deletion.

* * *
### Errors

*   **400 Bad Request**
    
    *   Occurs when the request body fails validation, or a required field is missing, or the provided userID or productID is not a valid number.
*   **500 Internal Server Error**
    
    *   Occurs for any other unexpected errors during the execution of the controller methods.

* * *

## Category
### Routes

*   **GET /category/getAll**

* * *

### Functionalities

*   **Get All Categories**
    *   Retrieves all categories from the database.
    *   Returns a list of all categories.

* * *

### Errors

*   **500 Internal Server Error**
    *   Occurs for any unexpected errors during the execution of the controller method.

* * *

## Sold Product
### Route

*   **POST /product/sold/sellProduct**

* * *

### Functionalities

*   **Sell Product**
    *   Validates the incoming request body to ensure the presence of required fields (buyerID, sellerID, productID).
    *   Throws a 400 error if any required field is missing or if any of the IDs are not valid numbers.
    *   Validates the existence of both buyer and seller in the database.
    *   Throws a 404 error if either the buyer or seller does not exist.
    *   Registers the transaction of selling the product in the database.
    *   Updates the owner of the product to the buyer's ID.
    *   Returns a success message upon successful product sale.

* * *

### Errors

*   **400 Bad Request**
    
    *   Occurs when any required field is missing in the request body or when any of the provided IDs are not valid numbers.
*   **404 Not Found**
    
    *   Occurs when either the buyer or seller does not exist in the database.
*   **500 Internal Server Error**
    
    *   Occurs for any other unexpected errors during the execution of the controller method.

* * *

## Rented Products
### Routes

*   **POST /product/rent/rentProduct**
*   **GET /product/rent/getRentProduct/:rentFromID**
*   **PUT /product/rent/updateRentStatus/:productID**

* * *

### Functionalities

*   **Rent Product**
    
    *   Validates the incoming request body to ensure the presence of required fields (rentToID, rentFromID, productID, date).
    *   Throws a 400 error if any required field is missing or if any of the IDs are not valid numbers.
    *   Validates the existence of both renter and owner in the database.
    *   Checks if the product is already rented; returns a 409 conflict if it is.
    *   Registers the rental transaction in the database.
    *   Returns a success message upon successful product rental.
*   **Get Rented Product by User ID**
    
    *   Retrieves all rented products associated with the provided rentFromID.
    *   Returns a list of rented products along with their details.
*   **Update Rent Status**
    
    *   Validates the productID parameter to ensure it is a valid number.
    *   Checks if the product is currently rented.
    *   Updates the retrieval status of the rented product to indicate it has been retrieved.
    *   Returns a success message upon successful update of rent status.

* * *

### Errors

*   **400 Bad Request**
    
    *   Occurs when any required field is missing in the request body or when any of the provided IDs are not valid numbers.
*   **404 Not Found**
    
    *   Occurs when either the renter or owner does not exist in the database, or when the product is not currently rented.
*   **409 Conflict**
    
    *   Occurs when trying to rent a product that is already rented.
*   **500 Internal Server Error**
    
    *   Occurs for any other unexpected errors during the execution of the controller methods.

### Additional Information

*   This controller assumes the use of asynchronous handler middleware (`asyncHandler`) to handle asynchronous operations and error handling seamlessly. Make sure to include this middleware in your route handlers.
*   Ensure that all dependencies listed in the `package.json` file are installed before running the server. You can install dependencies using `npm install`.
*   Customize the endpoints and functionalities as per your application's requirements.
