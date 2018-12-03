package dto;

public class Reader {

    private String readerID = "w167";
    private String readerName;
    private String mobileNumber;
    private String email;
public Reader(){

}
    public Reader(String readerName, String mobileNumber, String email) {
        this.readerName = readerName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        readerID =  readerID+this.hashCode();
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public String getEmail() {
        return this.email;
    }


    public String getReaderID() {
        return readerID;
    }

    public String getReaderName() {
        return readerName;
    }

    public void setReaderName(String readerName) {
        this.readerName = readerName;
    }

    @Override
    public String toString() {
        return "Reader{" +
                "readerID='" + readerID + '\'' +
                ", readerName='" + readerName + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
