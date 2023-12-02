import express, { Response, Request, NextFunction } from "express";
import {
  registerUser,
  checkUserCredentials,
  getUser,
} from "../controllers/user";
import { validationResult } from "express-validator";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userValidator";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post(
  "/register",
  registerUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: "validation error",
          error: errors.array(),
        });
      }

      const result = await registerUser(name, email, password);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  loginUserValidator,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: "validation error",
        error: errors.array(),
      });
    }

    const user = await checkUserCredentials(email, password);
    if (!user) {
      return res.status(400).send({
        message: "invalid credentials",
        success: false,
      });
    }

    req.session.userId = user.id;

    res.send({
      message: "Login successfully",
      data: user,
    });
  }
);

router.post("/logout", isAuthenticated, (req: Request, res: Response) => {
  req.session.userId = undefined;
  res.send({
    message: "Logout successfully.",
    success: true,
  });
});

router.get("/account", isAuthenticated, async (req: Request, res: Response) => {
  const user = await getUser(req.session.userId as number);
  res.send(user);
});

export { router as userRouter };
