package services;

import date.DateTime;
import dto.Book;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface LibraryManager {
    void addBook(String isbn, String bookTitle, String genre, DateTime publicationDate, List<String> authorName, String publisher, int numPages) throws Exception;

    void addDVD(String isbn, String title, String genre, DateTime publicationDate, String producerName) throws Exception;

    void deleteBook(String isbn) throws Exception;

    void deleteDVD(String isbn) throws Exception;

    void borrowBook(String isbn, String reader_id, Map<String, Object> dateBorrowed) throws Exception;

    void borrowDVD(String isbn, String readerID, Map<String, Object> dateBorrowed) throws Exception;

    void returnDVD(String isbn, DateTime dateTime) throws Exception;

    void returnBook(String isbn, DateTime dateTime) throws Exception;
}
