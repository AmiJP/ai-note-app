import express, { Response, Request, NextFunction } from "express";
import {
  createNote,
  getAllNotes,
  getNote,
  removeNote,
  updateNote,
} from "../controllers/note";

import { createNoteValidator } from "../validators/noteValidator";
import { validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/create",
  createNoteValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, image, note } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: "validation error",
          error: errors.array(),
        });
      }

      const userId = req.session.userId as number;

      const result = await createNote(title, image, note, userId);

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId as number;

    const result = await getAllNotes(userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.userId as number;

    const noteId = Number(req.params.id);

    const result = await getNote(noteId, userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as number;
      const noteId = Number(req.params.id);
      const { title, image, note } = req.body;
      const result = await updateNote(title, image, note, noteId, userId);

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.userId as number;

      const noteId = Number(req.params.id);

      const result = await removeNote(noteId, userId);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router as noteRouter };
