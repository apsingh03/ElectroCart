require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_FRONTEND_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Using body-parser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// socket.io
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New SOCKET Connection");

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const purchaseRoutes = require("./routes/purchase");

app.use("/admin", adminRoutes);
app.use("/client", clientRoutes);
app.use("/user", userRoutes);
app.use("/purchase", purchaseRoutes);

app.use("/", function (req, res) {
  try {
    return res.status(200).send("Welcome to ElectroCart ");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// actually we use app.listen() but we are using sockets so we have to use server.listen()
server.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on PORT ${process.env.PORT} `);
});

// Make io globally available
global.io = io;
