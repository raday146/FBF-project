import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const signToken = (id: string) => {
  return sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user: User, res: Response) => {
  const token = signToken(String(user.id));

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV !== "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  // this for removing password from the output

  res.send({ token, message: "Success login" });
};
export const Register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).send({
      message: "Password's do not match!",
    });
  }
  const user = await getRepository(User).save({
    first_name,
    last_name,
    email,
    password: await bcryptjs.hash(password, 10),
    is_ambassador: false,
  });
  res.send(user);
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).send({
      message: "Password or email are not correct!",
    });
  }
  const user = await getRepository(User).findOne(
    { email: email },
    {
      select: ["id", "password"],
    }
  );
  if (!user) {
    return res.status(400).send({
      message: "Invalid credentoals!",
    });
  }
  if (user && !(await bcryptjs.compare(password, user?.password))) {
    return res.status(400).send({
      message: "Invalid credentoals!",
    });
  }

  createSendToken(user, res);
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  res.send(req.user);
};

export const Logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 + 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({
    status: "logout successefuly!",
  });
};

export const UpdateProfile = async (req: Request, res: Response) => {
  const user: any = req.user;
  await getRepository(User).update(user?.id, req.body);
  res.send({ message: "sucess" });
};

export const UpdatePassword = async (req: Request, res: Response) => {
  const user: any = req.user;
  const { password, confirm_password } = req.body;
  if (password !== confirm_password) {
    res.status(400).send({
      message: "Password's do not match!",
    });
  }
  await getRepository(User).update(user?.id, {
    password: await bcryptjs.hash(password, 10),
  });
  res.send({
    message: "success",
  });
};
