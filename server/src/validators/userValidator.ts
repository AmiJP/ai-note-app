import { body } from "express-validator";

export const registerUserValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("please enter valid email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("password must be 4 character long"),
];

export const loginUserValidator = [
  body("email").isEmail().withMessage("please enter valid email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("password must be 4 character long"),
];
