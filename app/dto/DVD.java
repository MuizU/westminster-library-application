package dto;

import DateTime.DateTime;

public class DVD extends LibraryItem{
    private String[] subtitles;
    private Producer producer;
    private String[] actors;
    private String[] availableLangs;



    public void setSubtitles(String[] subtitles) {
        this.subtitles = subtitles;
    }

    public void setActors(String[] actors) {
        this.actors = actors;
    }

    public void setAvailableLangs(String[] availableLangs) {
        this.availableLangs = availableLangs;
    }

    public String[] getSubtitles() {
        return subtitles;
    }

    public Producer getProducer() {
        return producer;
    }

    public String[] getActors() {
        return actors;
    }

    public String[] getAvailableLangs() {
        return availableLangs;
    }
}
