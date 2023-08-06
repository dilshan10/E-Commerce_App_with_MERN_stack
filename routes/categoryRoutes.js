import express from "express";
import {isAdmin,requireSingIn} from "../middleware/authMiddleware.js";
import {categoryControlller,createCategoryController,deleteCategoryCOntroller,singleCategoryController,updateCategoryController,} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSingIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSingIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSingIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;