// src/books/resolvers/book.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Book, BookConnection } from '../../generated/graphql';
import type { PaginationInput } from '../../generated/graphql';
import { BooksService } from '../services/book.service';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query()
  async books(
    @Args('pagination') pagination: PaginationInput,
  ): Promise<BookConnection> {
    return this.booksService.findBooksConnection(pagination);
  }

  @Query()
  async book(@Args('id') id: string): Promise<Book | null> {
    return this.booksService.findOne(id);
  }
}
