package dto;

import date.DateTime;

import java.util.List;

public class Book extends LibraryItem {
    //the DVDs author is an array because a DVDs can have more than one author
    private List<String> book_authors;
    private String publisher;
    private int numPages;

    public Book() {

    }

    public Book(String isbn, String title, String sector, DateTime publication_date, List<String> book_author) {
        super(isbn, title, sector, publication_date);
        this.book_authors = book_author;
    }



    public String getPublisher() {
        return publisher;
    }

    public int getNumPages() {
        return numPages;
    }

    public List<String> getBook_authors() {
        return book_authors;
    }

    public void setBook_authors(List<String> book_authors) {
        this.book_authors = book_authors;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setNumPages(int numPages) {
        this.numPages = numPages;
    }

    @Override
    public String toString() {
        return "Book{" +
                "book_authors=" + book_authors +
                ", publisher='" + publisher + '\'' +
                ", numPages=" + numPages +
                '}';
    }
}
