export interface Book {
  book_id: string;
  title: string;
  price: number;
  authorId: number;
  isBorrowed: boolean;
}

export interface CreateBookDto {
  title: string;
  authorId: number;
  price: number;
}

export type User = {
  person_id: string;
  email: string;
  role: "employee" | "customer";
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isEmployee: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export interface CreateCustomerDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}