-- PERSONS

INSERT INTO library.person
(person_id, first_name, last_name, birth_date)
VALUES
('emp001', 'David', 'Cohen', '1990-05-10'),

('cus001', 'Yuval', 'Topaz', '2005-04-12'),
('cus002', 'Noam', 'Levi', '2002-07-18'),
('cus003', 'Shira', 'Mizrahi', '2001-11-02'),
('cus004', 'Daniel', 'Peretz', '1999-09-25'),

('auth001', 'George', 'Orwell', '1903-06-25'),
('auth002', 'J.R.R.', 'Tolkien', '1892-01-03'),
('auth003', 'Frank', 'Herbert', '1920-10-08'),
('auth004', 'Jane', 'Austen', '1775-12-16');


-- ACCOUNTS

INSERT INTO library.accounts
(account_id, person_id, email, password)
VALUES
('acc001', 'emp001', 'employee@library.com', '$2a$10$pNNOkP9VmPBjSgPQLmllJOUMBIvz4fiVw5qcZg98rlJXYj9sIm052'),
('acc002', 'cus001', 'yuval@library.com', '$2a$10$pNNOkP9VmPBjSgPQLmllJOUMBIvz4fiVw5qcZg98rlJXYj9sIm052'),
('acc003', 'cus002', 'noam@library.com', '$2a$10$pNNOkP9VmPBjSgPQLmllJOUMBIvz4fiVw5qcZg98rlJXYj9sIm052'),
('acc004', 'cus003', 'shira@library.com', '$2a$10$pNNOkP9VmPBjSgPQLmllJOUMBIvz4fiVw5qcZg98rlJXYj9sIm052'),
('acc005', 'cus004', 'daniel@library.com', '$2a$10$pNNOkP9VmPBjSgPQLmllJOUMBIvz4fiVw5qcZg98rlJXYj9sIm052');


-- EMPLOYEE

INSERT INTO library.employees
(employee_id)
VALUES
('emp001');


-- CUSTOMERS

INSERT INTO library.customers
(customer_id, is_active)
VALUES
('cus001', true),
('cus002', true),
('cus003', true),
('cus004', true);


-- WALLETS

INSERT INTO library.customer_wallets
(customer_id, balance)
VALUES
('cus001', 250),
('cus002', 150),
('cus003', 320),
('cus004', 75);


-- AUTHORS

INSERT INTO library.authors
(author_id)
VALUES
('auth001'),
('auth002'),
('auth003'),
('auth004');


-- BOOKS

INSERT INTO library.books
(book_id, title, author_id, price, is_borrowed, is_active, release_date)
VALUES

('book001', '1984', 'auth001', 40, false, true, '1949-06-08'),
('book002', 'Animal Farm', 'auth001', 35, true, true, '1945-08-17'),

('book003', 'The Hobbit', 'auth002', 50, false, true, '1937-09-21'),
('book004', 'The Fellowship of the Ring', 'auth002', 60, false, true, '1954-07-29'),
('book005', 'The Two Towers', 'auth002', 60, false, true, '1954-11-11'),
('book006', 'The Return of the King', 'auth002', 60, false, true, '1955-10-20'),

('book007', 'Dune', 'auth003', 70, true, true, '1965-08-01'),
('book008', 'Dune Messiah', 'auth003', 55, false, true, '1969-10-15'),
('book009', 'Children of Dune', 'auth003', 55, false, true, '1976-04-21'),

('book010', 'Pride and Prejudice', 'auth004', 45, false, true, '1813-01-28');


-- BORROW HISTORY

INSERT INTO library.book_borrows
(borrower_id, book_id, borrow_date, return_date)
VALUES

-- 1984 borrowed 4 times
('cus001', 'book001', '2026-01-05', '2026-01-15'),
('cus002', 'book001', '2026-02-01', '2026-02-10'),
('cus003', 'book001', '2026-03-01', '2026-03-12'),
('cus004', 'book001', '2026-04-01', '2026-04-08'),

-- Hobbit borrowed 3 times
('cus001', 'book003', '2026-01-20', '2026-01-30'),
('cus002', 'book003', '2026-03-05', '2026-03-18'),
('cus003', 'book003', '2026-04-20', '2026-05-02'),

-- Dune borrowed 5 times
('cus001', 'book007', '2026-01-01', '2026-01-10'),
('cus002', 'book007', '2026-02-10', '2026-02-20'),
('cus003', 'book007', '2026-03-15', '2026-03-28'),
('cus004', 'book007', '2026-04-12', '2026-04-25'),
('cus001', 'book007', '2026-05-01', NULL),

-- currently borrowed
('cus002', 'book002', '2026-05-20', NULL);