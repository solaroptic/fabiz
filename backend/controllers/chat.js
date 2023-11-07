import Chat from "../models/ChatModel.js";
import User from "../models/User.js";

// const asyncHandler = expressAsyncHandler;
export const accessChat = async (req, res) => {
  const { userId } = req.body;
  const { user } = req.body;
  console.log("access chat controller ran", user, userId);
  const self = user._id;

  if (!userId) {
    console.log("user param not given to get messages");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: self } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "userName picturePath",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [self, userId],
    };
    console.log(chatData.users);
    try {
      const createdChat = await Chat.create(chatData);
      console.log(createdChat);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const createGroupChat = async (req, res) => {
//   if (!req.body.users || !req.body.name) {
//     return res.status(400).send({ message: "Fill out all fields" });
//   }

//   const users = JSON.parse(req.body.users);

//   if (users < 2) {
//     return res
//       .status(400)
//       .send({ message: "More than 2 users needed per group" });
//   }
//   users.push(req.user);
//   try {
//     const groupChat = await Chat.create({
//       chatName: req.body.name,
//       users: users,
//       isGroupChat: true,
//       groupAdmin: req.user,
//       ////////////////////////userName??//////////////////////////////////////
//       ////////////////////////userName??//////////////////////////////////////
//     });

//     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password");
//     res.status(200).send(fullGroupChat);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//     throw new Error(error.message);
//   }
// };

// export const renameGroup = async (req, res) => {
//   const { chatId, chatName } = req.body;

//   const updatedChat = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       chatName,
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!updatedChat) {
//     res.status(404).json({ message: "Chat not found" });
//   } else {
//     res.json(updatedChat);
//   }
// };

// export const addToGroup = async (req, res) => {
//   const { chatId, userId } = req.body;

//   const added = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $push: { users: userId },
//     },
//     { new: true }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!added) {
//     res.status(404).json({ message: "Chat not found" });
//   } else {
//     res.json(added);
//   }
// };
// export const removeFromGroup = async (req, res) => {
//   const { chatId, userId } = req.body;

//   const removed = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $pull: { users: userId },
//     },
//     { new: true }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!removed) {
//     res.status(404).json({ message: "Chat not found" });
//   } else {
//     res.json(removed);
//   }
// };
