const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('./auth');
const { EventLog } = require('./middleware/eventlogger');
const {loginRouter} = require('./routes/login');
const { userRouter } = require('./routes/usersRoute'); // User Router
const { home } = require('./routes/homeRoute'); // Home Router


// Middleware for logging requests
app.use(EventLog);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Setup
app.use(
  session({
    secret: 'aabbcc112233', // Use a strong secret key in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set `secure: true` if using HTTPS
  })
);

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/login', loginRouter); // Login route
app.use('/', home); // Home route
app.use('/user', userRouter); // User route

// Dashboard route (Protected route example)
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(`Welcome [${req.user.name}] `);
  }
  res.redirect('/login');
});

// App server
const PORT = 8080; // Change to 3000 for dev mode, or use environment variable
const HOST = '127.0.0.1';
app.listen(PORT, HOST, () => {
  console.log(`App running on http://${HOST}:${PORT}/login`);
});
