// const express = require('express');
// const mongoose = require("mongoose");
// const app = express();
// app.use(express.json());


// //MongoDB connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     // useFindAndModify: false,
//     // useCreateIndex: true,
//   })
//   .then((response) => {
//     console.log("Connected to MongoDB Cloud Successfully......");
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


// app.use("/api/auth", require("./Controller/User"));
// app.use("/api", require("./Controller/Task"));


// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017');
      console.log('Connected to MongoDB Successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit process with failure
    }
  }

// Initialize Express app and start server
async function startApp() {
  await connectToDatabase();

  // Routes
  app.use('/api/auth', require('./Controller/User'));
  app.use('/api', require('./Controller/Task'));

  // Start server
  const PORT = process.env.PORT || 3000;
  return new Promise(resolve => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      resolve(server); // Resolve the server instance once it's started
    });
  });
}

module.exports = startApp(); // Export the promise to start the server



