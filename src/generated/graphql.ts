
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

export interface Author {
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

export interface Book {
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

export interface IQuery {
    author(id: string): Nullable<Author> | Promise<Nullable<Author>>;
    authors(): Author[] | Promise<Author[]>;
    book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
    books(): Book[] | Promise<Book[]>;
}

export type DateTime = any;
type Nullable<T> = T | null;
