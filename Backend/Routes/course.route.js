import express from "express";
import { courseDetails, createCourse, deleteCourse, getCourses, updateCourse } from "../Controller/course.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/create",createCourse);
router.put("/update/:courseId", updateCourse);
router.delete("/delete/:courseId", deleteCourse);
router.get ("/courses",getCourses);
router.get("/course/:courseId", courseDetails);

export default router;