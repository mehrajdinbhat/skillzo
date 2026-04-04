import { Course } from "../Models/course.model.js";
import { Purchase } from "../Models/purchase.model.js";
import mongoose from "mongoose";
// import stripe from "stripe";
import { v2 as cloudinary } from "cloudinary";

export const createCourse = async (req, res) => {
  // const title = req.body.title;
  // const description = req.body.description;
  // const price = req.body.price;
  // const image= req.body.image;
  const { title, description, price } = req.body;
  try {
    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { imageUrl } = req.files;
    if (!imageUrl || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const allowecFormat = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowecFormat.includes(imageUrl.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only JPEG, JPG, and PNG formats are allowed" });
    }
    // cloudinary upload
    const cloud_response = await cloudinary.uploader.upload(
      imageUrl.tempFilePath,
    );
    if (!cloud_response || cloud_response.error) {
      return res.status(500).json({ error: "error uploading to Cloudinary" });
    }

    const courseData = {
      title,
      description,
      price,
      imageUrl: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
    };
    const course = await Course.create(courseData);
    res.json({
      message: "course created sucessfully",
      course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
};
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price, imageUrl } = req.body;

  try {
    const course = await Course.updateOne(
      {
        _id: courseId,
      },
      {
        title,
        description,
        price,
        imageUrl,
      },
    );
    res.json({
      message: "course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update course" });
    console.error("Error updating course:", error);
  }
};
export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res.status(404).json({ errors: "can't not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in course deleting" });
    console.log("Error in course deleting", error);
  }
};
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(201).json({ courses });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting courses" });
    console.log("error to get courses", error);
  }
};
export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting course details" });
    console.log("Error in course details", error);
  }
};
export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    const existingPurchase = await Purchase.findOne({
      userId,
      courseId: new mongoose.Types.ObjectId(courseId),
    });
    if (existingPurchase) {
      return res
        .status(400)
        .json({ errors: "User has already purchased this course" });
    }

    // stripe payment code goes here!!
    // const amount = course.price;
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount,
    //   currency: "usd",
    //   payment_method_types: ["card"],
    // });

    res.status(201).json({
      message: "Course purchased successfully",
      course,
      // clientSecret: paymentIntent.client_secret,
    });
    // ✅ SAVE PURCHASE (THIS WAS MISSING)
    const purchase = new Purchase({
      userId,
      courseId,
    });

    await purchase.save();
  } catch (error) {
    res.status(500).json({ errors: "Error in course buying" });
    console.log("error in course buying ", error);
  }
};

