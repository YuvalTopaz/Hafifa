import { Request, Response } from "express";
import {
  createAuthorService,
  getAllAuthorsService,
  deleteAuthorService,
} from "../services/author.service";

export const create = async (req: Request, res: Response) => {
  try {
    const author = await createAuthorService(req.body);
    return res.status(201).json(author);
  } catch (error: any) {
    console.error("Error creating author:", error);
    if (error.message === "Missing author details") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Author already exists") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to create author" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const authors = await getAllAuthorsService();
    return res.json(authors);
  } catch (error: any) {
    return res.status(500).json({
      message: "Failed to load authors",
      dbError: error.parent?.message,
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    await deleteAuthorService(req.params.id as string);
    return res.status(204).send();
  } catch (error: any) {
    if (error.message === "Author not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to delete author" });
  }
};