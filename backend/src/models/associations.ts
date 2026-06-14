import { Person } from "./person.model";
import { Account } from "./account.model";
import { Author } from "./author.model";
import { Customer } from "./customer.model";
import { Employee } from "./employee.model";
import { Book } from "./book.model";
import { BookBorrow } from "./bookBorrow.model";
import { CustomerWallet } from "./customerWallet.model";

Account.belongsTo(Person, {
  foreignKey: "person_id",
});

Person.hasOne(Account, {
  foreignKey: "person_id",
});

Author.belongsTo(Person, {
  foreignKey: "author_id",
});

Person.hasOne(Author, {
  foreignKey: "author_id",
});

Customer.belongsTo(Person, {
  foreignKey: "customer_id",
});

Person.hasOne(Customer, {
  foreignKey: "customer_id",
});

Employee.belongsTo(Person, {
  foreignKey: "employee_id",
});

Person.hasOne(Employee, {
  foreignKey: "employee_id",
});

Book.belongsTo(Author, {
  foreignKey: "author_id",
});

Author.hasMany(Book, {
  foreignKey: "author_id",
});

BookBorrow.belongsTo(Customer, {
  foreignKey: "borrower_id",
});

Customer.hasMany(BookBorrow, {
  foreignKey: "borrower_id",
});

BookBorrow.belongsTo(Book, {
  foreignKey: "book_id",
});

Book.hasMany(BookBorrow, {
  foreignKey: "book_id",
});

Customer.hasOne(CustomerWallet, {
  foreignKey: "customer_id",
});

CustomerWallet.belongsTo(Customer, {
  foreignKey: "customer_id",
});

export { Person, Account, Author, Customer, Employee, Book, BookBorrow, CustomerWallet };