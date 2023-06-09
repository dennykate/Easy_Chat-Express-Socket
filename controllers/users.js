import User from "../models/users.js";
import crypto from "crypto";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res
        .status(400)
        .json({ status: false, message: "Email already taken" });
    }

    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatarImage: avatar,
    });

    user.password = password;
    return res.status(201).json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    const user = await User.findOne({ email, password: hashedPassword });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect Email or Password", status: false });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res
    //     .status(400)
    //     .json({ message: "Incorrect Password", status: false });
    // }

    delete user.password;
    return res.status(200).json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.status(200).json({ status: true, users });
  } catch (error) {
    next(error);
  }
};
