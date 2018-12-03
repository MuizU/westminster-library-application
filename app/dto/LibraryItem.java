package dto;

import date.DateTime;

public abstract class LibraryItem {

    private String isbn;
    private String title;
    private String genre;
    private DateTime publication_date;
    private DateTime borrowed_date;
    private Reader current_reader;
    private boolean borrowed;

    public LibraryItem() {

    }

    public LibraryItem(String isbn, String item_title, String sector, DateTime publication_date) {
        this.isbn = isbn;
        this.title = item_title;
        this.genre = sector;
        this.publication_date = publication_date;
    }


    public void setBorrowed(boolean borrowed) {
        this.borrowed = borrowed;
    }

    public boolean isBorrowed() {
        return borrowed;
    }



    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public DateTime getPublication_date() {
        return publication_date;
    }

    public void setPublication_date(DateTime publication_date) {
        this.publication_date = publication_date;
    }

    public DateTime getBorrowed_date() {
        return borrowed_date;
    }

    public void setBorrowed_date(DateTime borrowed_date) {
        this.borrowed_date = borrowed_date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Reader getCurrent_reader() {
        return current_reader;
    }

    public void setCurrent_reader(Reader current_reader) {
        this.current_reader = current_reader;
    }

    @Override
    public String toString() {
        return "LibraryItem{" +
                "isbn='" + isbn + '\'' +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", publication_date=" + publication_date +
                ", borrowed_date=" + borrowed_date +
                ", current_reader=" + current_reader +
                '}';
    }
}
