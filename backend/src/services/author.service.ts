import { sequelize } from "../config/database";
import {
  findPerson,
  findAuthorById,
  createPerson,
  createAuthor,
  getAllAuthors,
  deleteAuthorByEntity,
} from "../repositories/author.repository";

export const createAuthorService = async (data: any) => {
  const { first_name, last_name, birth_date } = data;

  if (!first_name || !last_name || !birth_date) {
    throw new Error("Missing author details");
  }

  const transaction = await sequelize.transaction();

  try {
    let person = await findPerson(
      first_name,
      last_name,
      birth_date,
      transaction
    );

    if (person) {
      const existingAuthor = await findAuthorById(
        person.get("person_id") as string,
        transaction
      );

      if (existingAuthor) {
        throw new Error("Author already exists");
      }
    } else {
      person = await createPerson(
        {
          first_name,
          last_name,
          birth_date,
        },
        transaction
      );
    }

    const author = await createAuthor(
      person.get("person_id") as string,
      transaction
    );

    await transaction.commit();

    return author;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getAllAuthorsService = async () => {
  const authors = await getAllAuthors();

  return authors.map((author: any) => ({
    author_id: author.author_id,
    first_name: author.Person.first_name,
    last_name: author.Person.last_name,
    birth_date: author.Person.birth_date,
  }));
};

export const deleteAuthorService = async (id: string) => {
  const author = await findAuthorById(id);

  if (!author) {
    throw new Error("Author not found");
  }

  await deleteAuthorByEntity(author);
};