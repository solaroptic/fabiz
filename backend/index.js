// import bodyParser from "body-parser";
// import helmet from "helmet";
// import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { Server } from "socket.io";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import memberRoutes from "./routes/members.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import User from "./models/User.js";
// env handler///////////////////
dotenv.config({ path: "../.env" });

// express//////main////////////
const app = express();

// Middleware///////////////////
app.use(express.json());
app.use(morgan("common"));
// app.use(cors());
app.use(cors({ origin: true }));
// app.use(
//   helmet({
//     csp: {
//       directives: {
//         connectSrc: [
//           "'self'",
//           "http://127.0.0.1:3001",
//           "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap",
//           "https://fonts.googleapis.com/css2?family=Grenze:wght@300;500;700&display=swap",
//         ],
//         defaultSrc: ["'self'"],
//       },
//     },
//   })
// );
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/members", memberRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Serve static assets
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}

// MongoDB/Mongoose Setup
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} perfectly, origin is ${process.env.CLIENT_ORIGIN}`
      );
      setupWebSocketServer(server); // This is correct, as it sets up WebSocket server
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

function setupWebSocketServer(server) {
  const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "https://fabian-project1.onrender.com:3000",
      allowedHeaders: ["*"],
      allowedOrigins: ["https://fabian-project1.onrender.com:3000"],
    },
  });

  io.on("connection", (socket) => {

    socket.on("setup", async (userData) => {
      socket.join(userData._id); // This is correct, it joins the socket to a room based on user ID
      socket.emit("connected"); // This is correct, it sends a "connected" event to the client
    });

    socket.on("join chat", (room) => {
      socket.join(room); // This is correct, it joins the socket to a chat room
    });

    socket.on("typing", (room) => {
      io.to(room).emit("typing"); // This is correct, it emits a "typing" event to the chat room
    });

    socket.on("stop typing", (room) => {
      io.to(room).emit("stop typing"); // This is correct, it emits a "stop typing" event to the chat room
    });

    socket.on("new message", async (newMessageReceived) => {
      const chat = newMessageReceived?.chat;
      const recipient = chat.users.find(
        (chatUser) => chatUser._id !== newMessageReceived.sender._id
      );
      chat.users.forEach((user) => {
        if (user._id == newMessageReceived.sender._id) {
          return; // This is correct, it prevents the sender from processing their own message
        }

        socket.in(user._id).emit("message received", newMessageReceived);

        const addToNotifications = async () => {
          const receiver = await User.findById(recipient._id);
          const senderName = newMessageReceived.sender.userName;
          const isSenderInArray = receiver.notifications.includes(senderName);
          !isSenderInArray && receiver.notifications.push(senderName);
          await receiver.save();
        };
        addToNotifications();
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from socket:", socket.id);
    });
  });
}

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
