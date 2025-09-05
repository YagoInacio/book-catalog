// src/books/resolvers/author.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Author, AuthorConnection } from '../../generated/graphql';
import type { PaginationInput } from '../../generated/graphql';
import { BooksService } from '../services/book.service';

@Resolver('Author')
export class AuthorsResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query()
  async authors(
    @Args('pagination') pagination: PaginationInput,
  ): Promise<AuthorConnection> {
    return this.booksService.findAuthorsConnection(pagination);
  }

  @Query()
  async author(@Args('id') id: string): Promise<Author | null> {
    return this.booksService.findOneAuthor(id);
  }
}
