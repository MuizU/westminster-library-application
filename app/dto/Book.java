package dto;

import DateTime.DateTime;

import java.util.Collection;

public class Book extends LibraryItem {
    //the book author is an array because a book can have more than one author
    private Collection<Author> book_author;
    private String publisher;
    private int numPages;



    public String getPublisher() {
        return publisher;
    }

    public int getNumPages() {
        return numPages;
    }

    public Collection<Author> getBook_author() {
        return book_author;
    }

    public void setBook_author(Collection<Author> book_author) {
        this.book_author = book_author;
    }
}
