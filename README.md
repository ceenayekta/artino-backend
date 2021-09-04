
# GOAL
Building a Restful CRUD API with Node.js, Express and MongoDB
## Background
Edquity is an emergency aid disbursement application. We deal with students (users), applications for emergency aid, and payments out the students. 

## First step
- Create a new file named index.js in the `src` folder and initiate an app with express that is available on port 8080 
- Install bodyparser and cors and use them in your app. Body-parser[-https://github.com/expressjs/body-parser] is the Node. js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.
- Define a GET route with path `health-check` to return the status of your application
- Define a simple GET route which returns a welcome message to the clients.

- TEST: Let’s now run the server and go to http://localhost:8080 to access the welcome route.


## Second step
- Write crud actions for each collection which are responsible for 4 actions: `create`, `retrieve` (get one by id, get all), `update`, and `delete`. In this step you don't need to create a mongo db! you will use an array for each collection. 
- Create a new file named routes.js inside `src` folder that returns all crud routes for each collection `application`, `payment`, and `user`.

- TEST: using postman to send a request to get all applications: 
```
Method: GET
URL: http://localhost:8080/applications
```

## Third step
- Create a mongo database, import your json files there! 
- Create a file to connect to your database
- Make changes to your actions to fetch data from your database

## Bonus #1
- Create a route to query your database for each collection. 
```
Method: POST
URL: http://localhost:8080/applications/query
Body: 
{
    query: {},
    limit: INT,
    skip: INT,
    sort: {}
}
```
- Create a route to return count of records in each collection. 
```
Method: GET
URL: http://localhost:8080/applications/count
```
## Bonus #2
Define two middlewares to handle your success and error responses

## Submitting your work
Upon completion, please create a merge request to this repository with your name in the title.  Good luck!