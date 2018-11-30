package DateTime;

public class DateTime {
    private int day;
    private int month;
    private int year;
    private int hour;
    private int minute;

    public DateTime(int day, int month, int year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
    public DateTime(int day, int month, int year, int hour, int minute) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minute=minute;
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
    public void setDate(int day, int month, int year){
        this.day = day;
        this.month=month;
        this.year=year;
    }
    public String getDate(){
        return this.day + "/"+this.month+"/"+this.year
                ;
    }

    @Override
    public String toString() {
        return "DateTime.DateTime{"+ "date="
                 + day +
                "/" + month +
                "/" + year +
                ", time=" + hour +
                ":" + minute +
                '}';
    }

    public boolean compareTo(DateTime d) {
        int day1 = d.getDay();
        int month1 = d.getMonth();
        int year1 = d.getYear();

        return (this.year <= year1) && (this.month <= month1) && (this.day <= day1);
    }
}