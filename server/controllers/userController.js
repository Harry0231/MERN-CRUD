import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, gender } = req.body;

    // Validations
    if (!name || !email || !password || !phone || !address || !gender) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const data = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      gender,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request with email:", email);

    // Check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare passwords using bcrypt.compareSync
    const match = bcrypt.compareSync(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};


export const getAllData = async (req, res) => {
  try {
    const allUsers = await userModel.find();

    res.status(200).send({
      success: true,
      message: "All user data retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching user data",
      error,
    });
  }
};

export const updateController = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, address, gender } = req.body;

    if (!name || !email || !phone || !address || !gender) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.gender = gender;

    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user data",
      error,
    });
  }
};
