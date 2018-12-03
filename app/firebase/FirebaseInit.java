package firebase;

import akka.stream.impl.fusing.Log;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import date.DateTime;
import dto.Book;
import dto.DVD;
import dto.Reader;
import dto.Report;
import javax.swing.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class FirebaseInit {
    public static Firestore firestore;

    public FirebaseInit() {
    }

    public static void initialize() throws IOException {
        if (firestore == null) {
            FileInputStream serviceAccount = new FileInputStream("app\\services\\ServiceAccount.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://westminster-library-syst-1bfa7.firebaseio.com")
                    .build();
            try {
                FirebaseApp.initializeApp(options);
            } catch (Exception ignored) {
            }

            firestore = FirestoreClient.getFirestore();
        }
    }

    //Method to write a book to the Database
    public static void writeBook(Book book) {
        firestore.collection("book").document(book.getIsbn()).set(book);
    }

    //Method to write a delete to the Database
    public static void deleteBook(String isbn) {

        firestore.collection("book").document(isbn).delete();

    }


    public static void returnBook(String isbn, DateTime dateReturned) throws Exception {
        DocumentReference docRef = firestore.collection("book").document(isbn);
        ApiFuture<DocumentSnapshot> future = docRef.get();

        DocumentSnapshot document = future.get();
        Book book;

        if (document.exists()) {
            book = document.toObject(Book.class);
            assert book != null;
            if ((dateReturned.compareHours(book.getBorrowed_date()) < 0)) {
                JOptionPane.showMessageDialog(null, "Error!" + new IllegalArgumentException("Invalid return date"));
            } else {
                //168 hours is 7 days
                firestore.collection("book").document(isbn).update("borrowed_date", null);
                firestore.collection("book").document(isbn).update("borrowed", false);
                firestore.collection("book").document(isbn).update("current_reader", null);
                if ((dateReturned.compareHours(book.getBorrowed_date()) > 168)) {
                    BigDecimal amountDue;
                    if (dateReturned.compareHours(book.getBorrowed_date()) <= 240) {
                        amountDue = new BigDecimal(dateReturned.compareHours(book.getBorrowed_date()) * 0.2);

                    } else {
                        amountDue = new BigDecimal(dateReturned.compareHours(book.getBorrowed_date()) * 0.5);
                    }
                    Map<String, Object> date = new HashMap<>();
                    date.put("date", book.getBorrowed_date().toString());
                    date.put("day", book.getBorrowed_date().getDay());
                    date.put("hour", book.getBorrowed_date().getHour());
                    date.put("minute", book.getBorrowed_date().getMinute());
                    date.put("month", book.getBorrowed_date().getMonth());
                    date.put("year", book.getBorrowed_date().getYear());
                    Report report = new Report(book.getIsbn(), book.getTitle(), String.valueOf(amountDue), date, "BOOK");
                    String id = new String(isbn + dateReturned.getDay() + dateReturned.getMonth() + dateReturned.getYear());
                    firestore.collection("report").document(id).set(report);
                }
            }
        }


    }

    public static void returnDVD(String isbn, DateTime dateReturned) throws Exception {
        DocumentReference docRef = firestore.collection("dvd").document(isbn);
        ApiFuture<DocumentSnapshot> future = docRef.get();

        DocumentSnapshot document = future.get();
        DVD dvd;
        if (document.exists()) {
            dvd = document.toObject(DVD.class);
            assert dvd != null;
            if ((dateReturned.compareHours(dvd.getBorrowed_date()) < 0)) {
                JOptionPane.showMessageDialog(null, "Error!" + new IllegalArgumentException("Invalid return date"));
            } else {
                //168 hours is 7 days
                firestore.collection("dvd").document(isbn).update("borrowed_date", null);
                firestore.collection("dvd").document(isbn).update("borrowed", false);
                firestore.collection("dvd").document(isbn).update("current_reader", null);
                if ((dateReturned.compareHours(dvd.getBorrowed_date()) > 72)) {
                    BigDecimal amountDue;
                    if (dateReturned.compareHours(dvd.getBorrowed_date()) <= 144) {
                        amountDue = new BigDecimal(dateReturned.compareHours(dvd.getBorrowed_date()) * 0.2);

                    } else {
                        amountDue = new BigDecimal(dateReturned.compareHours(dvd.getBorrowed_date()) * 0.5);
                    }
                    Map<String, Object> date = new HashMap<>();
                    date.put("date", dvd.getBorrowed_date().toString());
                    date.put("day", dvd.getBorrowed_date().getDay());
                    date.put("hour", dvd.getBorrowed_date().getHour());
                    date.put("minute", dvd.getBorrowed_date().getMinute());
                    date.put("month", dvd.getBorrowed_date().getMonth());
                    date.put("year", dvd.getBorrowed_date().getYear());
                    Report report = new Report(dvd.getIsbn(), dvd.getTitle(), String.valueOf(amountDue), date, "DVD");
                    String id = new String(isbn + dateReturned.getDay() + dateReturned.getMonth() + dateReturned.getYear());
                    firestore.collection("report").document(id).set(report);
                }
            }
        }

    }

    public static void addBookBorrowDate(Map<String, Object> dateTime, String isbn) {
        firestore.collection("book").document(isbn).update("borrowed_date", dateTime);
    }

    public static void addDVDBorrowDate(Map<String, Object> dateTime, String isbn) {
        firestore.collection("dvd").document(isbn).update("borrowed_date", dateTime);
    }


    public static void addReaderToBook(String reader_id, String isbn) throws Exception {
        DocumentReference bookRef = firestore.collection("book").document(isbn);
        DocumentReference readerRef = firestore.collection("reader").document(reader_id);
        ApiFuture<DocumentSnapshot> future = readerRef.get();
        DocumentSnapshot document = future.get();
        Reader reader;
        if (document.exists()) {
            reader = document.toObject(Reader.class);
            Map<String, Object> currentReader = new HashMap<>();
            assert reader != null;
            currentReader.put("email", reader.getEmail());
            currentReader.put("mobileNumber", reader.getMobileNumber());
            currentReader.put("readerID", reader.getReaderID());
            currentReader.put("readerName", reader.getReaderName());
            bookRef.update("current_reader", currentReader);
        } else {
            System.out.println("No Such Document");
        }

    }

    public static void addReaderToDVD(String reader_id, String isbn) throws Exception {
        DocumentReference bookRef = firestore.collection("dvd").document(isbn);
        DocumentReference readerDVDRef = firestore.collection("reader").document(reader_id);
        ApiFuture<DocumentSnapshot> future = readerDVDRef.get();
        DocumentSnapshot document = future.get();
        Reader reader;
        if (document.exists()) {
            reader = document.toObject(Reader.class);
            Map<String, Object> currentReader = new HashMap<>();
            assert reader != null;
            currentReader.put("email", reader.getEmail());
            currentReader.put("mobileNumber", reader.getMobileNumber());
            currentReader.put("readerID", reader.getReaderID());
            currentReader.put("readerName", reader.getReaderName());
            bookRef.update("current_reader", currentReader);
        } else {
            System.out.println("No Such Document");
        }

    }

    public static void borrowBook(String isbn) {
        firestore.collection("book").document(isbn).update("borrowed", true);


    }

    public static void borrowDVD(String isbn) {
        firestore.collection("dvd").document(isbn).update("borrowed", true);


    }

    public static void createReader(Reader reader) {
        firestore.collection("reader").document(reader.getReaderID()).set(reader);
    }

    public static void deleteDVD(String isbn) {
        firestore.collection("dvd").document(isbn).delete();

    }

    public static Reader[] getAllReaders() throws Exception {
        ApiFuture<QuerySnapshot> future = firestore.collection("reader").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        Reader[] readers = new Reader[documents.size()];
        for (int i = 0; i < documents.size(); i++) {
            readers[i] = documents.get(i).toObject(Reader.class);
        }
        return readers;
    }

    public static Report[] getReport() throws Exception {
        ApiFuture<QuerySnapshot> future = firestore.collection("report").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        Report[] report = new Report[documents.size()];
        for (int i = 0; i < documents.size(); i++) {
            report[i] = documents.get(i).toObject(Report.class);
        }
        return report;
    }

    public static Book[] getAllBooks() throws Exception {
        ApiFuture<QuerySnapshot> future =
                firestore.collection("book").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        Book[] books = new Book[documents.size()];
        for (int q = 0; q < documents.size(); q++) {
            books[q] = documents.get(q).toObject(Book.class);
        }
        return books;
    }

    public static DVD[] getAllDVDs() throws Exception {
        // fetch multiple DVD references
        ApiFuture<QuerySnapshot> future =
                firestore.collection("dvd").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        DVD[] dvds = new DVD[documents.size()];
        for (int q = 0; q < documents.size(); q++) {
            dvds[q] = documents.get(q).toObject(DVD.class);
        }
        return dvds;
    }

    public static void writeDVD(DVD dvd) {
        firestore.collection("dvd").document(dvd.getIsbn()).set(dvd);
    }
}
