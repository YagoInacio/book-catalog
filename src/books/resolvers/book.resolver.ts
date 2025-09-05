// src/books/resolvers/book.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Book } from '../../generated/graphql';
import { BooksService } from '../services/book.service';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query()
  async books(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query()
  async book(@Args('id') id: string): Promise<Book | null> {
    return this.booksService.findOne(id);
  }
}
