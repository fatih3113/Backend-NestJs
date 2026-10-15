import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book-dto.js";
import { Book } from "./entities/book-entity.js";


@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: "Contoh Buku",
      author: "Penulis",
      isbn: "1234567890",
      publishYear: 2020,
    },
  ];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }
    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.books.length ? this.books[this.books.length - 1].id + 1 : 1,
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      publishYear: createBookDto.publishYear,
    };
    this.books.push(newBook);
    return newBook;
  }

  remove(id: number): void {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }
    this.books.splice(index, 1);
  }
}