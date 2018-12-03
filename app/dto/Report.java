package dto;


import java.util.Map;

public class Report {
    private String isbn;
    private String title;
    private String amountDue;
    private Map<String, Object> dateReturned;
    private String itemType;

   public Report() {

    }

    public Report(String isbn, String title, String amountDue, Map<String, Object> dateReturned, String itemType) {
        this.isbn = isbn;
        this.title = title;
        this.amountDue = amountDue;
        this.dateReturned = dateReturned;
        this.itemType = itemType;
    }

    public String getAmountDue() {
        return amountDue;
    }

    public void setAmountDue(String amountDue) {
        this.amountDue = amountDue;
    }

    public Map<String, Object> getDateReturned() {
        return dateReturned;
    }

    public void setDateReturned(Map<String, Object> dateReturned) {
        this.dateReturned = dateReturned;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
