// src/books/resolvers/author.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Author } from '../../generated/graphql';
import { BooksService } from '../services/book.service';

@Resolver('Author')
export class AuthorsResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query()
  async authors(): Promise<Author[]> {
    return this.booksService.findAllAuthors();
  }

  @Query()
  async author(@Args('id') id: string): Promise<Author | null> {
    return this.booksService.findOneAuthor(id);
  }
}
