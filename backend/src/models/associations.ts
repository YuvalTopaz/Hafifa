import { Person } from "./person.model";
import { Author } from "./author.model";
import { Book } from "./book.model";

Author.belongsTo(Person, {
  foreignKey: "id",
});

Person.hasOne(Author, {
  foreignKey: "id",
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
});

Author.hasMany(Book, {
  foreignKey: "author_id",
});