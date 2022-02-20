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
router
  .post("/create", CreateProduct)
  .get("product", GetProduct)
  .put("edit", UpdateProduct)
  .delete("delete", DeleteProduct);
export default router;
