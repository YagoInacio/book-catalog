import { Module } from '@nestjs/common';
import { BooksResolver } from './resolvers/book.resolver';
import { BooksService } from './services/book.service';

@Module({
  imports: [],
  controllers: [],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
