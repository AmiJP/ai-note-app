import { body } from "express-validator";

export const createNoteValidator = [
  body("title").notEmpty().withMessage("title is required"),
  body("note").notEmpty().withMessage("note is required"),
];
