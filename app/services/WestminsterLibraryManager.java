package services;

import date.DateTime;
import dto.Book;
import dto.DVD;
import firebase.FirebaseInit;

import java.util.List;
import java.util.Map;


public class WestminsterLibraryManager implements LibraryManager {


    @Override
    public void addDVD(String isbn, String title, String genre, DateTime publicationDate, String producerName) throws Exception{
        DVD dvd = new DVD(isbn, title, genre, publicationDate, producerName);
        FirebaseInit.initialize();
        FirebaseInit.writeDVD(dvd);

    }

    @Override
    public void addBook(String isbn, String bookTitle, String genre, DateTime publicationDate, List<String> authorName, String publisher, int numPages) throws Exception{
        Book book = new Book(isbn, bookTitle, genre, publicationDate, authorName);
        book.setBorrowed(false);
        book.setBorrowed_date(new DateTime());
        book.setPublisher(publisher);
        book.setNumPages(numPages);
        FirebaseInit.initialize();
        FirebaseInit.writeBook(book);
    }

    @Override
    public void deleteBook(String isbn) throws Exception {
        FirebaseInit.initialize();
        FirebaseInit.deleteBook(isbn);
    }
    @Override
    public void deleteDVD(String isbn) throws Exception{
        FirebaseInit.initialize();
        FirebaseInit.deleteDVD(isbn);
    }
    @Override
    public void borrowBook(String isbn,String reader_id, Map<String, Object> dateBorrowed) throws Exception{
        FirebaseInit.initialize();
        FirebaseInit.addBookBorrowDate(dateBorrowed, isbn);
        FirebaseInit.addReaderToBook(reader_id, isbn);
    }
    @Override
    public void borrowDVD(String isbn, String readerID, Map<String, Object> dateBorrowed)throws Exception{
        FirebaseInit.initialize();
        FirebaseInit.addDVDBorrowDate(dateBorrowed, isbn);
        FirebaseInit.addReaderToDVD(readerID, isbn);
    }
    public void returnBook(String isbn , DateTime dateTime) throws  Exception{
        FirebaseInit.initialize();
        FirebaseInit.returnBook(isbn, dateTime);
    }
    public void returnDVD(String isbn, DateTime dateTime) throws Exception{
        FirebaseInit.initialize();
        FirebaseInit.returnDVD(isbn,dateTime);
    }


}
