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

    // Handle image upload if provided
    let profilePic;
    if (req.file) {
      profilePic = req.file.buffer;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Save user with or without image
    const data = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      gender,
      profilePic,
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
        profilePic: user.profilePic ? user.profilePic.toString('base64') : null,
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



