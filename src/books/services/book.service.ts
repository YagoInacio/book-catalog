// src/books/services/book.service.ts
import { Injectable } from '@nestjs/common';
import {
  Book,
  Author,
  BookType,
  PaginationInput,
  BookConnection,
  AuthorConnection,
} from 'src/generated/graphql';

@Injectable()
export class BooksService {
  private mockAuthors: Author[] = [
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

  private mockBooks: Book[] = [
    {
      id: '1',
      name: 'The Great Gatsby',
      isbn: '978-0-7432-7356-5',
      releaseDate: new Date('1925-04-10'),
      type: BookType.BOOK,
      description: 'A classic American novel set in the Jazz Age.',
      authorId: '1',
      author: this.mockAuthors[0], // Reference to the author
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
      author: this.mockAuthors[1], // Reference to the author
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
      author: this.mockAuthors[1], // Same author as 1984
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor() {
    // Populate author books after initialization
    this.populateAuthorBooks();
  }

  private populateAuthorBooks(): void {
    this.mockAuthors.forEach((author) => {
      author.books = this.mockBooks.filter(
        (book) => book.authorId === author.id,
      );
    });
  }

  async findAll(): Promise<Book[]> {
    return this.mockBooks;
  }

  async findOne(id: string): Promise<Book | null> {
    return this.mockBooks.find((book) => book.id === id) || null;
  }

  async findAllAuthors(): Promise<Author[]> {
    return this.mockAuthors;
  }

  async findOneAuthor(id: string): Promise<Author | null> {
    return this.mockAuthors.find((author) => author.id === id) || null;
  }

  async findBooksConnection(
    pagination: PaginationInput,
  ): Promise<BookConnection> {
    const { first, after, last, before } = pagination;
    const allBooks = await this.findAll();

    const edges = allBooks.map((book) => ({
      node: book,
      cursor: Buffer.from(book.id).toString('base64'),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: edges[0]?.cursor,
        endCursor: edges[edges.length - 1]?.cursor,
      },
      totalCount: allBooks.length,
    };
  }

  async findAuthorsConnection(
    pagination: PaginationInput,
  ): Promise<AuthorConnection> {
    const { first, after, last, before } = pagination;
    const allAuthors = await this.findAllAuthors();

    const edges = allAuthors.map((author) => ({
      node: author,
      cursor: Buffer.from(author.id).toString('base64'),
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: edges[0]?.cursor,
        endCursor: edges[edges.length - 1]?.cursor,
      },
      totalCount: allAuthors.length,
    };
  }

  async findAuthorBooks(authorId: string): Promise<Book[]> {
    return this.mockBooks.filter((book) => book.authorId === authorId);
  }
}
