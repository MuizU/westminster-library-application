package dto;

import date.DateTime;

public class DVD extends LibraryItem {
    private String[] subtitles;
    private String producer;
    private String[] actors;
    private String[] availableLangs;

    public DVD() {

    }

    public DVD(String isbn, String title, String sector, DateTime publication_date, String producer, String[] actors, String[] availableLangs) {
        super(isbn, title, sector, publication_date);
        this.producer = producer;
        this.actors = actors;
        this.availableLangs = availableLangs;
    }

    public DVD(String isbn, String item_title, String sector, DateTime publication_date, String producer) {
        super(isbn, item_title, sector, publication_date);
        this.producer = producer;
    }

    public String[] getSubtitles() {
        return subtitles;
    }

    public void setSubtitles(String[] subtitles) {
        this.subtitles = subtitles;
    }

    public String getProducer() {
        return producer;
    }

    public String[] getActors() {
        return actors;
    }

    public void setActors(String[] actors) {
        this.actors = actors;
    }

    public String[] getAvailableLangs() {
        return availableLangs;
    }

    public void setAvailableLangs(String[] availableLangs) {
        this.availableLangs = availableLangs;
    }
}
