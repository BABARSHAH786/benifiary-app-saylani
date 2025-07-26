// backend/controller/beneficiary.controller.js
import Beneficiary from "../model/beneficiary.model.js";
import { v4 as uuidv4 } from "uuid";

// ✅ Register new beneficiary
export const registerBeneficiary = async (req, res) => {
  try {
    const { cnic, name, phone, address, purpose, department } = req.body;

    if (!cnic || !name || !purpose || !department) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await Beneficiary.findOne({ cnic });
    if (exists) {
      return res.status(400).json({ message: "Beneficiary already registered" });
    }

    const token = uuidv4().slice(0, 8).toUpperCase();

    const beneficiary = await Beneficiary.create({
      cnic,
      name,
      phone,
      address,
      purpose,
      department,
      token,
      createdBy: req.user?._id || null,
    });

    res.status(201).json({
      message: "Beneficiary registered successfully",
      token: beneficiary.token,
      beneficiary,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get beneficiary by CNIC
export const getBeneficiaryByCNIC = async (req, res) => {
  try {
    const { cnic } = req.params;

    const beneficiary = await Beneficiary.findOne({ cnic });

    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" });
    }

    res.status(200).json({ beneficiary });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Dummy placeholder for future route
export const getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find({});
    res.status(200).json({ beneficiaries });
  } catch (error) {
    console.error("Fetch All Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
