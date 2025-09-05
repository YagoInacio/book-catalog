import { Module } from '@nestjs/common';
import { BooksResolver } from './resolvers/book.resolver';
import { BooksService } from './services/book.service';
import { AuthorsResolver } from './resolvers/author.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [BooksResolver, BooksService, AuthorsResolver],
})
export class BooksModule {}
