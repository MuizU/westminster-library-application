package dto;

import java.util.List;

public class Author {

    private String authorName;
    private List<Book> booksWritten;


    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

}
