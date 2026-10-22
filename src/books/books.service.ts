import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';
import { UpdateBookDto } from './dto/update-book-dto.js';


@Injectable()
export class BooksService {  
  constructor(
    // Injeksi Repository TypeORM untuk entitas Book
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // 1. CREATE: Membuat buku baru di PostgreSQL
  async create(dto: CreateBookDto): Promise<Book> {
    // repository.create() hanya membentuk objek entitas di memori
    const newBook = this.bookRepository.create(dto);
    // repository.save() mengeksekusi SQL: INSERT INTO books (...) VALUES (...)
    return await this.bookRepository.save(newBook);
  }

  // 2. READ ALL: Mengambil seluruh buku yang masih aktif
  async findAll(): Promise<Book[]> {
    // Mengeksekusi SQL: SELECT * FROM books WHERE deleted_at IS NULL ORDER BY created_at DESC
    return await this.bookRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // 3. READ ONE: Mencari satu buku berdasarkan UUID
  async findOne(id: string): Promise<Book> {
    // Mengeksekusi SQL: SELECT * FROM books WHERE id = $1 AND deleted_at IS NULL
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Buku dengan ID #${id} tidak ditemukan.`);
    }
    return book;
  }

  // 4. UPDATE: Memperbarui data buku
  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    // Pastikan buku ada dulu sebelum diupdate
    const book = await this.findOne(id);

    // Gabungkan perubahan baru ke objek yang sudah ada
    const updatedBook = this.bookRepository.merge(book, dto);

    // Mengeksekusi SQL: UPDATE books SET ... WHERE id = $1
    return await this.bookRepository.save(updatedBook);
  }

  // 5. SOFT DELETE: Menghapus buku secara logis
  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    await this.findOne(id); // Validasi keberadaan buku

    // Mengeksekusi SQL: UPDATE books SET deleted_at = NOW() WHERE id = $1
    await this.bookRepository.softDelete(id);

    return {
      message: `Buku #${id} berhasil diarsipkan (soft-deleted).`,
      deletedId: id,
    };
  }

  // 6. RESTORE: Memulihkan buku yang pernah di-soft delete
  async restore(id: string): Promise<{ message: string }> {
    // Mengeksekusi SQL: UPDATE books SET deleted_at = NULL WHERE id = $1
    await this.bookRepository.restore(id);
    return { message: `Buku #${id} berhasil dipulihkan kembali.` };
  }
}