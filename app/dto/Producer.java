package dto;

import DateTime.DateTime;

public class Producer {
    private String name;
    private int numMoviesProduced;
    private DateTime dob;

    public Producer(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getNumMoviesProduced() {
        return numMoviesProduced;
    }

    public DateTime getDob() {
        return dob;
    }

    public void setNumMoviesProduced(int numMoviesProduced) {
        this.numMoviesProduced = numMoviesProduced;
    }

    public void setDob(DateTime dob) {
        this.dob = dob;
    }
}
