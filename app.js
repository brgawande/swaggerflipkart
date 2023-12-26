import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { errorMiddlewares } from "./middlewares/errorMiddlewares.js";
import SwaggerUi from "swagger-ui-express";
import YAML from "yamljs";
// import swaggerJSDoc from "swagger-jsdoc";
const swaggerJSDoc = YAML.load("./api.yaml");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerJSDoc));

import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRouter.js";
app.use(userRouter);
app.use(productRouter);

export default app;

app.use(errorMiddlewares);
