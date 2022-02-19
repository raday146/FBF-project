import { Router } from "express";
import {
  Login,
  Register,
  AuthenticatedUser,
  Logout,
  UpdateProfile,
  UpdatePassword,
} from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { Ambassdors } from "../controllers/user.controller";
import {
  CreateProduct,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
} from "../controllers/product.controller";
const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.use(AuthMiddleware);
router.get("/user", AuthenticatedUser);
router.post("/logout", Logout);
router.put("/profile", UpdateProfile);
router.put("/updatepasword", UpdatePassword);

/// user
router.get("/ambassador", Ambassdors);

// product
router.post("/create", CreateProduct);
router.get("/product", GetProduct);
router.put("/updateproduct", UpdateProduct);
router.delete("/deleteproduct", DeleteProduct);

export default router;
