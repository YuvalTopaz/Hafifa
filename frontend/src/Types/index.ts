export interface Book {
  id: number;
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