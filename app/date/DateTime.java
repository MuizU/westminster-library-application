package date;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;


public class DateTime {
    private int day;
    private int month;
    private int year;
    private int hour;
    private int minute;
    public DateTime() {
    }

    public DateTime(int day, int month, int year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    public DateTime(int day, int month, int year, int hour, int minute) throws Exception {


        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minute = minute;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getMinute() {
        return minute;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setDate(int day, int month, int year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    public String getDate() {
        return this.day + "/" + this.month + "/" + this.year;
    }

    @Override
    public String toString() {
        return "DateTime{" + "date="
                + day +
                "/" + month +
                "/" + year +
                ", time=" + hour +
                ":" + minute +
                '}';
    }
    //Method to compare the hours between two datetime objects
    public int compareHours(DateTime dateTime) throws ParseException {
        SimpleDateFormat sdf1 = new SimpleDateFormat("dd/M/yyyy");
        SimpleDateFormat sdf2 = new SimpleDateFormat("dd/M/yyyy");
        Date current_date = sdf2.parse(this.getDate());
        Date compare_date = sdf1.parse(dateTime.getDate());

        long differenceBetweenDates = current_date.getTime() - compare_date.getTime();


        return Math.toIntExact(24 * (TimeUnit.DAYS.convert(differenceBetweenDates, TimeUnit.MILLISECONDS)));
    }


}