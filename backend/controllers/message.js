import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "userName picturePath");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "userName picturePath",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "userName picturePath")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
