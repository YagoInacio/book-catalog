
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum BookType {
    AUDIOBOOK = "AUDIOBOOK",
    BOOK = "BOOK",
    EBOOK = "EBOOK"
}

export interface PaginationInput {
    after?: Nullable<string>;
    before?: Nullable<string>;
    first?: Nullable<number>;
    last?: Nullable<number>;
}

export interface Node {
    id: string;
}

export interface Author extends Node {
    biography?: Nullable<string>;
    birthDate?: Nullable<DateTime>;
    books?: Nullable<Book[]>;
    createdAt: DateTime;
    id: string;
    name: string;
    nationality?: Nullable<string>;
    updatedAt: DateTime;
    website?: Nullable<string>;
}

export interface AuthorBookConnection {
    edges: AuthorBookEdge[];
    pageInfo: PageInfo;
}

export interface AuthorBookEdge {
    cursor: string;
    node: Book;
}

export interface AuthorConnection {
    edges: AuthorEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface AuthorEdge {
    cursor: string;
    node: Author;
}

export interface Book extends Node {
    author: Author;
    authorId: string;
    coverImageUrl?: Nullable<string>;
    createdAt: DateTime;
    description?: Nullable<string>;
    id: string;
    isbn: string;
    name: string;
    releaseDate: DateTime;
    type: BookType;
    updatedAt: DateTime;
}

export interface BookConnection {
    edges: BookEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export interface BookEdge {
    cursor: string;
    node: Book;
}

export interface PageInfo {
    endCursor?: Nullable<string>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: Nullable<string>;
}

export interface IQuery {
    author(id: string): Nullable<Author> | Promise<Nullable<Author>>;
    authorBooks(authorId: string, pagination?: Nullable<PaginationInput>): AuthorBookConnection | Promise<AuthorBookConnection>;
    authors(pagination?: Nullable<PaginationInput>): AuthorConnection | Promise<AuthorConnection>;
    book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
    books(pagination?: Nullable<PaginationInput>): BookConnection | Promise<BookConnection>;
}

export type DateTime = any;
type Nullable<T> = T | null;
