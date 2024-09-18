module.exports = [
  {
    question:
      "What is the purpose of the Express.js `next()` function in middleware?",
    answers: [
      "To pass control to the next middleware function",
      "To terminate the request-response cycle",
      "To modify the response before sending it",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Which HTTP method is typically used to retrieve data from a server?",
    answers: ["POST", "GET", "PUT"],
    correctIndex: 1,
  },
  {
    question: "In Node.js, which module is used to create an HTTP server?",
    answers: ["fs", "http", "url"],
    correctIndex: 1,
  },
  {
    question:
      "What does the `app.use()` method do in an Express.js application?",
    answers: [
      "Adds a new route to the application",
      "Mounts middleware functions to handle requests",
      "Starts the Express server",
    ],
    correctIndex: 2,
  },
  {
    question:
      "Which of the following is true about the `res.send()` method in Express.js?",
    answers: [
      "It sends a JSON response",
      "It ends the response process",
      "It is used to set HTTP headers",
    ],
    correctIndex: 1,
  },
  {
    question:
      "What is the default HTTP status code sent by `res.send()` if none is specified?",
    answers: ["200 OK", "404 Not Found", "500 Internal Server Error"],
    correctIndex: 0,
  },
  {
    question:
      "How do you parse JSON data in the body of an HTTP request in an Express.js application?",
    answers: [
      "Using `app.use(express.json())`",
      "Using `app.use(express.urlencoded())`",
      "Using `app.use(express.text())`",
    ],
    correctIndex: 0,
  },
  {
    question:
      "What is the correct way to handle errors in an Express.js application?",
    answers: [
      "By using a middleware function with four arguments",
      "By using a try-catch block inside the route",
      "By returning a 404 status code in the route",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Which HTTP method is idempotent, meaning it can be repeated multiple times without different outcomes?",
    answers: ["POST", "PUT", "DELETE"],
    correctIndex: 1,
  },
  {
    question:
      "In Express.js, which method would you use to define a route that matches both GET and POST requests?",
    answers: ["app.route()", "app.all()", "app.use()"],
    correctIndex: 0,
  },
  {
    question: "What is the primary role of the Node.js `event loop`?",
    answers: [
      "To execute synchronous code",
      "To handle asynchronous callbacks",
      "To read files from the filesystem",
    ],
    correctIndex: 1,
  },
  {
    question: "Which of the following is true about HTTP cookies?",
    answers: [
      "Cookies are sent by the server and stored in the client’s memory",
      "Cookies can only be set by the client",
      "Cookies are used to identify users and store session data",
    ],
    correctIndex: 2,
  },
  {
    question: "How can you serve static files in an Express.js application?",
    answers: [
      "Using the `express.static()` middleware",
      "By creating a GET route for each file",
      "By directly reading files in every route",
    ],
    correctIndex: 0,
  },
  {
    question: "What is the purpose of the `req.params` object in Express.js?",
    answers: [
      "It stores the query parameters in a URL",
      "It stores the URL path parameters",
      "It stores the body of a POST request",
    ],
    correctIndex: 1,
  },
  {
    question:
      "In Node.js, which method is used to read the content of a file asynchronously?",
    answers: ["fs.readFileSync()", "fs.readFile()", "fs.open()"],
    correctIndex: 1,
  },
  {
    question: "Which of the following is NOT a valid HTTP status code?",
    answers: ["200", "418", "600"],
    correctIndex: 2,
  },
  {
    question: "What is a key feature of the REST architectural style?",
    answers: [
      "Client-server separation",
      "Tightly coupled architecture",
      "Stateful communication",
    ],
    correctIndex: 0,
  },
  {
    question:
      "In an Express.js app, where should you define error-handling middleware?",
    answers: [
      "At the top of the middleware stack",
      "Before any other middleware",
      "After all other routes and middleware",
    ],
    correctIndex: 2,
  },
  {
    question:
      "How does the `res.json()` method differ from `res.send()` in Express.js?",
    answers: [
      "res.json() only sends JSON responses, while res.send() can send any data type",
      "res.json() does not end the response, while res.send() does",
      "res.send() sends a JSON response while res.json() sends plain text",
    ],
    correctIndex: 0,
  },
  {
    question:
      "What does the `Content-Type` header in an HTTP request or response specify?",
    answers: [
      "The type of encoding used for the content",
      "The length of the content",
      "The media type of the resource",
    ],
    correctIndex: 2,
  },
  {
    question: "What does the term 'API' stand for in web development?",
    answers: [
      "Application Programming Interface",
      "Application Process Interaction",
      "Application Protocol Interface",
    ],
    correctIndex: 0,
  },
  {
    question:
      "What is the purpose of using middleware in an Express.js application?",
    answers: [
      "To serve static files",
      "To handle requests and responses",
      "To perform actions before or after a request is processed",
    ],
    correctIndex: 2,
  },
  {
    question: "Which of the following is NOT a core module in Node.js?",
    answers: ["http", "fs", "mongoose"],
    correctIndex: 2,
  },
  {
    question:
      "What is the default port used by an Express.js application when running locally?",
    answers: ["3000", "8080", "5000"],
    correctIndex: 0,
  },
  {
    question:
      "In an Express.js application, which method is used to define a route that handles all HTTP methods?",
    answers: ["app.get()", "app.all()", "app.route()"],
    correctIndex: 1,
  },
];
