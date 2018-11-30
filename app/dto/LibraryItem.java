package dto;
import DateTime.DateTime;
public abstract class LibraryItem {

    private String isbn;
    private String item_title;
    private String sector;
    private DateTime publication_date;
    private DateTime borrowed_date;
    private Reader current_reader;


    public String getIsbn() {
        return isbn;
    }

    public String getSector() {
        return sector;
    }

    public DateTime getPublication_date() {
        return publication_date;
    }

    public DateTime getBorrowed_date() {
        return borrowed_date;
    }

    public void setBorrowed_date(DateTime borrowed_date) {
        this.borrowed_date = borrowed_date;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getItem_title() {
        return item_title;
    }

    public void setItem_title(String item_title) {
        this.item_title = item_title;
    }

    public Reader getCurrent_reader() {
        return current_reader;
    }

    public void setCurrent_reader(Reader current_reader) {
        this.current_reader = current_reader;
    }
}
