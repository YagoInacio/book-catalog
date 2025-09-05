import { Injectable } from '@nestjs/common';
import { Book, Author, BookType } from 'src/generated/graphql';

const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'F. Scott Fitzgerald',
    biography: 'American novelist and short story writer.',
    birthDate: new Date('1896-09-24'),
    nationality: 'American',
    createdAt: new Date(),
    updatedAt: new Date(),
    books: [], // Will be populated by resolver
  },
  {
    id: '2',
    name: 'George Orwell',
    biography: 'English novelist, essayist, journalist, and critic.',
    birthDate: new Date('1903-06-25'),
    nationality: 'British',
    createdAt: new Date(),
    updatedAt: new Date(),
    books: [], // Will be populated by resolver
  },
];

const mockBooks: Book[] = [
  {
    id: '1',
    name: 'The Great Gatsby',
    isbn: '978-0-7432-7356-5',
    releaseDate: new Date('1925-04-10'),
    type: BookType.BOOK,
    description: 'A classic American novel set in the Jazz Age.',
    authorId: '1',
    author: mockAuthors[0], // Reference to the author
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: '1984',
    isbn: '978-0-452-28423-4',
    releaseDate: new Date('1949-06-08'),
    type: BookType.EBOOK,
    description: 'A dystopian social science fiction novel.',
    authorId: '2',
    author: mockAuthors[1], // Reference to the author
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Animal Farm',
    isbn: '978-0-452-28424-1',
    releaseDate: new Date('1945-08-17'),
    type: BookType.BOOK,
    description: 'An allegorical novella about farm animals.',
    authorId: '2',
    author: mockAuthors[1], // Same author as 1984
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class BooksService {
  constructor() {}

  async findAll(): Promise<Book[]> {
    return mockBooks;
  }

  async findOne(id: string): Promise<Book | null> {
    return mockBooks.find((book) => book.id === id) || null;
  }

  // Helper method to get authors (for when you create author resolver)
  async findAllAuthors(): Promise<Author[]> {
    return mockAuthors;
  }

  async findOneAuthor(id: string): Promise<Author | null> {
    return mockAuthors.find((author) => author.id === id) || null;
  }
}
