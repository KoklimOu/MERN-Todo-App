## Understanding Middleware

 - Middleware in Express.js are functions that handle requests and responses in your application. Each middleware function can perform tasks like:
    1. Executing code.
    2. Modifying the request and response object. 
    3. Ending the request-response cycle.
    4. Calling the next middleware function in the stack.

    ````JavaScript 
    function logger(req, res, next) {
    console.log(req);
    }
    // This is just a regular function call with string arguments logger('req', 'res', 'next');

    function logger(req, res, next) {
        console.log(req.method, req.url); // Logging request method and URL
        next(); // Call next to pass control to the next middleware
    }

    // Register the middleware with the app
    app.use(logger);
    ````
 - The use() function in Express.js is a method used to register middleware and route handlers with an Express application or router. This method is very versatile and allows you to define middleware that can handle requests to any route, specific routes, or specific HTTP methods.
 - The next() function is a function that allow control to the next middleware(the middleware below it).
 - Some middlewares have automatically added to the middleware(library or built-in middlewares), and the manual created middleware are not automatically added, you have to call it explicitally.
 -  Each middleware function should call `next()` to pass control to the next middleware function. If a middleware function does not call next(), the request will stop there and subsequent middleware or route handlers will not execute.

 This is what middleware is if we talk about its defintion, but we developer talk about middleware meaning about the function or something that handle something before the main purpose of your application. <Br>
 **Example:** When the request coming, you want to take the request and return the response to the request, but in the middle request and response, there are middlewares(middleware functions) which will execute before you request to the route and return the response like, you need to excute `cors()` function first to added some headers that allow to to perform cross origin resouces sharing. Or `express.json()` to parse the incoming JSON request. Let's take it this way, you want to watch a movie, before you can watch the movie, you need to buy the ticket, and then show it to the standby then you can go to main purpose is watch a movie. The buying ticket and the standby person can be consider middleware. 

 ## Understanding MVC architecture

The Model-View-Controller (MVC) architecture is a widely used design pattern that promotes separation of concerns, making code more organized, maintainable, and testable. While the choice of architecture ultimately depends on developer preference and project requirements, MVC offers a well-structured approach for building API applications.

 This application is using the Model-View-Controller architecture.
 - **Controllers**: Handle the businness logic and interact with the models to fetch and minipulate data. They response to HTTP requests routed from the `routes` files.
 - **Models**: Represent data structure and businness logic. Typical they are used with a database to perform CRUD operations.
 - **Views**: This application does not have Views but we can consider the views as the JSON response of xml... since this is the API application without views.
 - **Routes**: is where you import controllers and define the endpoints.

 ## Differences between regular function and arrow function

 - **Argument**: Regular function can the access the all arguements that provided to it, but arrow function can't.
 - **Explicit**: Arrow function can return data without using the `return` keyword.
 - **The arrow fun**ction doesn't have it own execution context so `this` binding does not work.
    example like you cannot access to the class field/properties... by using `this` key word but the regular work can do that. 

## Standard Responses

Using standard API response formats is like having a secret language between backend and frontend developers. These standardized responses, with clear codes and messages, act as a troubleshooting guide, making it easier to pinpoint and fix issues. For example, a 401 (unauthorized) code instantly tells the frontend developer that something's wrong with the authentication, prompting them to check headers or credentials. This saves time, reduces frustration, and ensures a smoother development experience for everyone involved.

## Understand HTTP request methods (GPPD)

### GET:
**Purpose:** Retrieves data from a server at the specified resource. <br/> 
**Usage:** Used to request data such as web pages, images, or files. <br/>
**Idempotent:** Yes. Multiple identical requests should produce the same result.
**Safe:** Yes. It doesn't change the state of the resource.

### POST:
**Purpose:** Submits data to a server to create or update a resource.<br/>
**Usage:** Commonly used in forms and data submission processes.<br/>
**Idempotent:** No. Multiple requests can create multiple resources or have different effects.<br/>
**Safe:** No. It changes the state of the resource.
### PUT:

**Purpose:** Replaces all current representations of the target resource with the request payload.<br/>
**Usage:** Used to update a resource or create it if it does not exist.<br/>
Idempotent: Yes. Multiple identical requests should produce the same result.<br/>
**Safe:** No. It changes the state of the resource.

### DELETE:

**Purpose:** Removes the specified resource from the server.<br/>
**Usage:** Used to delete a resource identified by a URL.<br/>
**Idempotent:** Yes. Multiple identical requests should produce the same result.<br/>
**Safe:** No. It changes the state of the resource.

What's the point of using GET POST PUT or DELETE when you actually can using one method and do the logic at your service?

## Why Use Different HTTP Methods?

### 1. Semantic Difference and Clarity
- **Intent**: Each HTTP method conveys a specific intention, helping developers understand the endpoint's purpose:
  - **GET**: Retrieve data.
  - **POST**: Create new data.
  - **PUT**: Update existing data or create new data if it doesn’t exist.
  - **DELETE**: Remove data.
- **Machine-Consumable**: Software tools can interpret these methods correctly, automating interactions with APIs, and making integrations smoother and more reliable.

### 2. Caching
- **GET**: Responses to GET requests can be cached by browsers and intermediaries (like CDNs), improving performance and reducing server load.
  - Example: `GET /products/123` retrieves product details and can be cached for future requests.

### 3. Parameter Handling and Security
- **GET**: Sends parameters through the URL (query string), which is visible in browser history, logs, and URLs.
  - Suitable for non-sensitive data.
  - Example: `GET /search?q=example`
- **POST**: Sends parameters in the request body, not visible in URLs.
  - More secure for sensitive data (e.g., passwords).
  - Example: `POST /login` with the payload `{ "username": "user", "password": "pass" }`

### 4. Ease of Use and Implementation
- **Resource Collections**: Using the correct method simplifies API design:
  - **POST**: Create a new resource in a collection.
    - Example: `POST /examples` to create a new example.
  - **DELETE**: Remove resources.
    - Example: `DELETE /examples` to delete the entire collection.

Using one method (like POST) for all operations complicates the API:
- **Example**: Using POST for deletion requires additional logic to differentiate actions:
  - Compare `POST /examples` with body `{ "action": "delete" }` (confusing) versus `DELETE /examples` (clear and standard).

## Summary of the Advantages

1. **Semantic Difference and Clarity**:
   - Helps developers understand API operations.
   - Facilitates better collaboration and maintenance.

2. **Caching**:
   - GET requests can be cached, improving performance and reducing load.

3. **Parameter Handling and Security**:
   - GET exposes parameters in the URL (less secure).
   - POST, PUT, and DELETE use request bodies (more secure for sensitive data).

4. **Ease of Use and Implementation**:
   - Clear separation of concerns and intentions.
   - Simplifies API design and usage.

## Improved Practical Example

### Scenario: Managing a Blog

- **Retrieve a blog post**:
  - `GET /posts/123`
  - Retrieves the post with ID 123.
  - Can be cached for performance.

- **Create a new blog post**:
  - `POST /posts`
  - Creates a new blog post with the provided data.
  - Parameters are in the body, keeping the URL clean and secure.

- **Update a blog post**:
  - `PUT /posts/123`
  - Updates the post with ID 123 or creates it if it doesn’t exist.
  - Clear intent and idempotent (repeating the request has the same effect).

- **Delete a blog post**:
  - `DELETE /posts/123`
  - Deletes the post with ID 123.
  - Clear and straightforward.

## Conclusion

Using the correct HTTP methods (GET, POST, PUT, DELETE) according to their intended purposes enhances security, performance, clarity, and ease of use for both developers and machines interacting with the API.
