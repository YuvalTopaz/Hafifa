DROP SCHEMA IF EXISTS "library" CASCADE;

CREATE SCHEMA "library" AUTHORIZATION postgres;

CREATE TABLE "library".person (
    person_id varchar(50) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    birth_date timestamp NOT NULL,

    CONSTRAINT person_pkey
        PRIMARY KEY (person_id)
);

CREATE TABLE "library".accounts (
    account_id varchar(50) NOT NULL,
    person_id varchar(50) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,

    CONSTRAINT accounts_pkey
        PRIMARY KEY (account_id),

    CONSTRAINT accounts_email_key
        UNIQUE (email),

    CONSTRAINT accounts_person_id_key
        UNIQUE (person_id),

    CONSTRAINT fk_account_person
        FOREIGN KEY (person_id)
        REFERENCES "library".person(person_id)
);

CREATE TABLE "library".authors (
    author_id varchar(50) NOT NULL,

    CONSTRAINT authors_pkey
        PRIMARY KEY (author_id),

    CONSTRAINT fk_author_person
        FOREIGN KEY (author_id)
        REFERENCES "library".person(person_id)
);

CREATE TABLE "library".customers (
    customer_id varchar(50) NOT NULL,
    is_active boolean NOT NULL DEFAULT true,

    CONSTRAINT customers_pkey
        PRIMARY KEY (customer_id),

    CONSTRAINT fk_customer_person
        FOREIGN KEY (customer_id)
        REFERENCES "library".person(person_id)
);

CREATE TABLE "library".customer_wallets (
    customer_id varchar(50) NOT NULL,
    balance numeric(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT customer_wallets_pkey
        PRIMARY KEY (customer_id),

    CONSTRAINT fk_customer_wallet_customer
        FOREIGN KEY (customer_id)
        REFERENCES "library".customers(customer_id)
);

CREATE TABLE "library".employees (
    employee_id varchar(50) NOT NULL,

    CONSTRAINT employees_pkey
        PRIMARY KEY (employee_id),

    CONSTRAINT fk_employee_person
        FOREIGN KEY (employee_id)
        REFERENCES "library".person(person_id)
);

CREATE TABLE "library".books (
    book_id varchar(50) NOT NULL,
    title text NOT NULL,
    author_id varchar(50) NOT NULL,
    price numeric(10,2) NOT NULL DEFAULT 0,
    is_borrowed boolean NOT NULL DEFAULT false,
    is_active boolean NOT NULL DEFAULT true,
    release_date date NULL,

    CONSTRAINT books_pkey
        PRIMARY KEY (book_id),

    CONSTRAINT fk_book_author
        FOREIGN KEY (author_id)
        REFERENCES "library".authors(author_id)
);

CREATE TABLE "library".book_borrows (
    borrow_id bigserial NOT NULL,
    borrower_id varchar(50) NOT NULL,
    book_id varchar(50) NOT NULL,
    borrow_date date NOT NULL,
    return_date date NULL,

    CONSTRAINT book_borrows_pkey
        PRIMARY KEY (borrow_id),

    CONSTRAINT fk_borrow_customer
        FOREIGN KEY (borrower_id)
        REFERENCES "library".customers(customer_id),

    CONSTRAINT fk_borrow_book
        FOREIGN KEY (book_id)
        REFERENCES "library".books(book_id)
);

CREATE INDEX idx_book_borrows_borrower
ON "library".book_borrows(borrower_id);

CREATE INDEX idx_book_borrows_book
ON "library".book_borrows(book_id);