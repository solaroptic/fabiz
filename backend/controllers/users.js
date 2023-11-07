import User from "../models/User.js";

// read
// getUser
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get List of members
export const getAllUsers = async (req, res) => {
  const user = req.user;
  const id = user.id;
  // why just id.......??????????????????????????????????????
  try {
    const users = await User.find({ _id: { $ne: id } });
    res.status(200).json(users);
    console.log(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// search bar to find users/////////////////////////////
export const searchAllUsers = async (req, res) => {
  const user = req.user;
  const id = user.id;
  const keyword = req.query.search
    ? {
        $or: [
          { userName: { $regex: req.query.search, $options: "i" } },
          { location: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: id } });
  res.send(users);
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, location, about, news } = req.body;
    const user = await User.findById(id);

    if (user) {
      user.userName = userName;
      user.location = location;
      user.about = about;
      user.news = news;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { userName, location, about, news },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateUserPicture = async (req, res) => {
  try {
    const { id } = req.params;
    const { picturePath } = req.body;
    const user = await User.findById(id);
    if (user) {
      user.picturePath = picturePath;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { picturePath },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateNotifications = async (req, res) => {
  try {
    const notifications = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.notifications = notifications;
    await user.save();

    res.status(200).json({ message: "Notifications updated successfully" });
  } catch (err) {
    res.status(505).json({ message: err.message });
  }
};
