// repositories/author.repository.ts

import { Transaction } from "sequelize";
import { Author, Person } from "../models";

export const findPerson = (
  first_name: string,
  last_name: string,
  birth_date: string,
  transaction?: Transaction
) => {
  return Person.findOne({
    where: { first_name, last_name, birth_date },
    transaction,
  });
};

export const findAuthorById = (
  author_id: string,
  transaction?: Transaction
) => {
  return Author.findByPk(author_id, { transaction });
};

export const createPerson = (
  data: any,
  transaction: Transaction
) => {
  return Person.create(data, { transaction });
};

export const createAuthor = (
  author_id: string,
  transaction: Transaction
) => {
  return Author.create({ author_id }, { transaction });
};

export const getAllAuthors = () => {
  return Author.findAll({
    include: [Person],
  });
};

export const deleteAuthorByEntity = (author: Author) => {
  return author.destroy();
};