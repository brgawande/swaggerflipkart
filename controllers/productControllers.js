import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import getDataUri from "../middlewares/dataUri.js";
import { Product } from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const addProducts = catchAsyncError(async (req, res, next) => {
  const { title, description, price, category, subcategory } = req.body;

  if (!title || !description || !price || !category || !subcategory)
    return next(new ErrorHandler("Please Enter All The Fields", 404));

  const file = req.file;

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Product.create({
    title,
    description,
    price,
    category,
    subcategory,
    image: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "product Added Successfully",
  });
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  await cloudinary.v2.uploader.destroy(product.image.public_id);

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not found", 404));

  const { title, description, price, category, subcategory } = req.body;

  const file = req.file;

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  if (title) {
    product.title = title;
  }
  if (description) {
    product.description = description;
  }
  if (price) {
    product.price = price;
  }
  if (category) {
    product.category = category;
  }
  if (subcategory) {
    product.subcategory = subcategory;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(product.image.public_id);
    product.image.public_id = mycloud.public_id;
    product.image.url = mycloud.secure_url;
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "product Updated Successfully",
  });
});

export const getfilteredProducts = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";
  const products = await Product.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  });

  res.status(200).json({
    success: true,
    products,
  });
});
