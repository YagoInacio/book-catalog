// src/books/services/book.service.ts
import { Injectable } from '@nestjs/common';
import {
  Book,
  Author,
  BookType,
  PaginationInput,
  BookConnection,
  AuthorConnection,
  AuthorBookConnection,
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

  private encodeCursor(id: string): string {
    return Buffer.from(id).toString('base64');
  }

  private decodeCursor(cursor: string): string {
    return Buffer.from(cursor, 'base64').toString('utf-8');
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

    // Sort books by ID for consistent ordering (in a real app, you'd sort by a timestamp or other field)
    const sortedBooks = [...allBooks].sort((a, b) => a.id.localeCompare(b.id));

    // Decode cursors
    const afterCursor = after ? this.decodeCursor(after) : null;
    const beforeCursor = before ? this.decodeCursor(before) : null;

    let filteredBooks = sortedBooks;

    // Apply cursor filtering
    if (afterCursor) {
      filteredBooks = filteredBooks.filter((book) => book.id > afterCursor);
    }
    if (beforeCursor) {
      filteredBooks = filteredBooks.filter((book) => book.id < beforeCursor);
    }

    // Apply limit
    let limitedBooks = filteredBooks;
    if (first && first > 0) {
      limitedBooks = filteredBooks.slice(0, first);
    } else if (last && last > 0) {
      limitedBooks = filteredBooks.slice(-last);
    }

    // Create edges
    const edges = limitedBooks.map((book) => ({
      node: book,
      cursor: this.encodeCursor(book.id),
    }));

    // Calculate page info
    const hasNextPage = first ? filteredBooks.length > first : false;
    const hasPreviousPage = last ? filteredBooks.length > last : false;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor: edges[0]?.cursor || null,
        endCursor: edges[edges.length - 1]?.cursor || null,
      },
      totalCount: allBooks.length,
    };
  }

  async findAuthorsConnection(
    pagination: PaginationInput,
  ): Promise<AuthorConnection> {
    const { first, after, last, before } = pagination;
    const allAuthors = await this.findAllAuthors();

    // Sort authors by ID for consistent ordering
    const sortedAuthors = [...allAuthors].sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    // Decode cursors
    const afterCursor = after ? this.decodeCursor(after) : null;
    const beforeCursor = before ? this.decodeCursor(before) : null;

    let filteredAuthors = sortedAuthors;

    // Apply cursor filtering
    if (afterCursor) {
      filteredAuthors = filteredAuthors.filter(
        (author) => author.id > afterCursor,
      );
    }
    if (beforeCursor) {
      filteredAuthors = filteredAuthors.filter(
        (author) => author.id < beforeCursor,
      );
    }

    // Apply limit
    let limitedAuthors = filteredAuthors;
    if (first && first > 0) {
      limitedAuthors = filteredAuthors.slice(0, first);
    } else if (last && last > 0) {
      limitedAuthors = filteredAuthors.slice(-last);
    }

    // Create edges
    const edges = limitedAuthors.map((author) => ({
      node: author,
      cursor: this.encodeCursor(author.id),
    }));

    // Calculate page info
    const hasNextPage = first ? filteredAuthors.length > first : false;
    const hasPreviousPage = last ? filteredAuthors.length > last : false;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor: edges[0]?.cursor || null,
        endCursor: edges[edges.length - 1]?.cursor || null,
      },
      totalCount: allAuthors.length,
    };
  }

  async findAuthorBooks(authorId: string): Promise<Book[]> {
    return this.mockBooks.filter((book) => book.authorId === authorId);
  }

  async findAuthorBooksConnection(
    authorId: string,
    pagination: PaginationInput,
  ): Promise<AuthorBookConnection> {
    const { first, after, last, before } = pagination;
    const authorBooks = this.mockBooks.filter(
      (book) => book.authorId === authorId,
    );

    // Sort books by ID for consistent ordering
    const sortedBooks = [...authorBooks].sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    // Decode cursors
    const afterCursor = after ? this.decodeCursor(after) : null;
    const beforeCursor = before ? this.decodeCursor(before) : null;

    let filteredBooks = sortedBooks;

    // Apply cursor filtering
    if (afterCursor) {
      filteredBooks = filteredBooks.filter((book) => book.id > afterCursor);
    }
    if (beforeCursor) {
      filteredBooks = filteredBooks.filter((book) => book.id < beforeCursor);
    }

    // Apply limit
    let limitedBooks = filteredBooks;
    if (first && first > 0) {
      limitedBooks = filteredBooks.slice(0, first);
    } else if (last && last > 0) {
      limitedBooks = filteredBooks.slice(-last);
    }

    // Create edges
    const edges = limitedBooks.map((book) => ({
      node: book,
      cursor: this.encodeCursor(book.id),
    }));

    // Calculate page info
    const hasNextPage = first ? filteredBooks.length > first : false;
    const hasPreviousPage = last ? filteredBooks.length > last : false;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor: edges[0]?.cursor || null,
        endCursor: edges[edges.length - 1]?.cursor || null,
      },
    };
  }
}
