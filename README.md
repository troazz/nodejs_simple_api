# NodeJS Simple CRUD API with MySQL
Example of NodeJS CRUD (Create Read Update Delete) API with MySQL database, it has category and product table.

## Installation Steps
1. Clone this repository or download .zip file.
2. Create new database on your MySQL Server.
3. Import `database.sql`
4. Install node module by run ``npm install`` on your console.
5. Execute ``node myapp.js`` to run this app.
6. When this app is running you can try to use this API.

## Run API Test
1. Execute ``node myapp.js`` to run this app.
2. Execute ``jasmine-node ./test/`` to start testing.

## API Documentation

## Category

#### List All Category [GET /category]
List all category with it's child.

+ Response 200 (application/json)

#### Add New Category [POST /category]
Add new category

+ Body Params
    + name (string)
    + [description] (string)
    + [parent] (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Update Category [PUT /category/{id}]
Update category data

+ Parameters
    + id (int)

+ Body Params
    + name (string)
    + [description] (string)
    + [parent] (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Delete Category [DELETE /category/{id}]
Delete category

+ Parameters
    + id (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Category Detail [GET /category/{id}]
Get detail data of specified category with id

+ Parameters
    + id (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)
