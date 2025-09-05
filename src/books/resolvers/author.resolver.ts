// src/books/resolvers/author.resolver.ts
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import type {
  Author,
  AuthorConnection,
  AuthorBookConnection,
  PaginationInput,
} from '../../generated/graphql';
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

  @ResolveField('booksConnection')
  async booksConnection(
    @Parent() author: Author,
    @Args('pagination') pagination: PaginationInput,
  ): Promise<AuthorBookConnection> {
    return this.booksService.findAuthorBooksConnection(author.id, pagination);
  }
}
