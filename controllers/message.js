import Message from "../models/message.js";

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res
        .status(201)
        .json({ message: "Message send successfully", status: true });
    } else {
      return res
        .status(400)
        .json({ message: "Your request fail", status: false });
    }
  } catch (error) {
    next(error);
  }
};
export const getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.status(200).json(projectMessages);
  } catch (error) {
    next(error);
  }
};
