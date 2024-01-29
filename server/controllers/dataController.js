import dataModel from "../models/dataModel.js";

export const getAllData = async (req, res) => {
  try {
    const allData = await dataModel.find();
    res.status(200).json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDataByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await dataModel.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createDataController = async (req, res) => {
  try {
    const newData = new dataModel(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateDataController = async (req, res) => {
  const { id } = req.params;
  try {
    const existingData = await dataModel.findOne({ email: req.body.email });

    // Check if the email is being updated to a new value
    if (existingData && existingData._id.toString() !== id) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const updatedData = await dataModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteDataController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await dataModel.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
