import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    userName: "Jim Fabizxnugreib",
    email: "flex@gmail.com",
    password: "dogsandcats",
    picturePath: "p11.jpeg",
    about: "a little about  me...",
    location: "San Fran, CA",
    news: "Funny thing happened the other day...",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    userName: "Kendall Frampton",
    email: "that@gmail.com",
    password: "kendallrules",
    picturePath: "p3.jpeg",
    about: "a little about  me...",
    location: "New York, CA",
    news: "Funny thing happened the other day...e",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    userName: "Ken Franz",
    email: "someguy@gmail.com",
    password: "laffalot22",
    picturePath: "p4.jpeg",
    about: "a little about  me...",
    location: "Boise, ID",
    news: "Funny thing happened the other day...ntist Hacker",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    userName: "Frankencense",
    email: "whatchadoing@gmail.com",
    password: "barqshasbite",
    picturePath: "p6.jpeg",
    about: "a little about  me...",
    location: "Korea, CA",
    news: "Funny thing happened the other day...",
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
];
