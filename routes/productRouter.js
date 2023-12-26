import express from "express";
import {
  addProducts,
  deleteProducts,
  getAllProducts,
  getSingleProduct,
  getfilteredProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import singleUpload from "../utils/multer.js";

const router = express.Router();

router.route("/addproduct").post(singleUpload, addProducts);
router.route("/getallproducts").get(getAllProducts);
router.route("/getsingleproducts/:id").get(getSingleProduct);
router.route("/deletesingleproducts/:id").delete(deleteProducts);
router.route("/updatesingleproducts/:id").put(singleUpload, updateProduct);
router.route("/getfilteredproducts").get(getfilteredProducts);

export default router;
