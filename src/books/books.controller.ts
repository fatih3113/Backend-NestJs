import {Controller,Get,Post,Delete,Put,Patch,Param,} from '@nestjs/common';

@Controller('books')
export class BooksController {

  // GET /books
  @Get()
  getBooks() {
    return [
      { title: 'Semua data buku' }
    ];
  }

  // POST /books
  @Post()
  createBook() {
    return {
      message: 'Buku berhasil dibuat'
    };
  }

  // DELETE /books
  @Delete()
  deleteBook() {
    return {
      message: 'Buku berhasil dihapus'
    };
  }

  // PUT /books
  @Put()
  updateBook() {
    return {
      message: 'Buku berhasil diperbarui'
    };
  }

  // PATCH /books
  @Patch()
  updatePartialBook() {
    return {
      message: 'Buku berhasil diperbarui sebagian'
    };
  }

  // GET /books/:id
  @Get(':id')
  getBookById(@Param('id') id: string) {
    return {
      data: `Buku dengan ID ${id}`
    };
  }

  // PUT /books/:id
  @Put(':id')
  updateBookById(@Param('id') id: string) {
    return {
      data: `Buku dengan ID ${id} berhasil diperbarui`
    };
  }

  // DELETE /books/:id
  @Delete(':id')
  deleteBookById(@Param('id') id: string) {
    return {
      data: `Buku dengan ID ${id} berhasil dihapus`
    };
  }
}