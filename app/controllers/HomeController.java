package controllers;

import com.fasterxml.jackson.databind.JsonNode;

import date.DateTime;
import dto.Reader;
import firebase.FirebaseInit;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.LibraryManager;
import services.WestminsterLibraryManager;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    private LibraryManager westminster_library_manager = new WestminsterLibraryManager();
    //The method to check if the ISBN is valid
    private static boolean checkIsbn(String isbn) {
        String regex = "^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(isbn);
        return matcher.matches();
    }

    public Result appSummary() {
        JsonNode jsonNode = Json.toJson(new AppSummary("westminster-library-application"));
        return ok(jsonNode).as("application/json");
    }

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */

    public Result index() throws IOException {
        FirebaseInit.initialize();
        return ok("Connection success");
    }

    // Method to add a book
    public Result addBook() throws Exception {
        JsonNode body = request().body().asJson();
        if (body == null) {
            return badRequest("Please Complete All Fields");
        } else {
            if (body.findPath("isbn") != null || body.findPath("title") != null
                    || body.findPath("genre") != null ||
                    body.findPath("pubDate") != null || body.findPath("pubDate") != null || body.findPath("publisher") != null || body.findPath("numPages") != null) {
                if (checkIsbn(body.findPath("isbn").textValue())) {
                    String isbn = body.findPath("isbn").textValue();
                    String title = body.findPath("title").textValue();
                    String genre = body.findPath("genre").textValue();
                    String publishedDate_stringVal = body.findPath("pubDate").textValue();
                    String publisher = body.findPath("publisher").textValue();
                    int numPages = Integer.valueOf(body.findPath("numPages").textValue());
                    List<String> raw_date = Arrays.asList(publishedDate_stringVal.split("-"));
                    DateTime pubDate = new DateTime(Integer.valueOf(raw_date.get(2)), Integer.valueOf(raw_date.get(1)), Integer.valueOf(raw_date.get(0)));
                    List<String> authors = new ArrayList<>(Arrays.asList(body.findPath("authors").textValue().split(",")));
                    FirebaseInit.initialize();
                    westminster_library_manager.addBook(isbn, title, genre, pubDate, authors, publisher, numPages);
                    return ok("Book Added successfully ");
                } else {
                    return badRequest("Invalid ISBN. Please Add A Valid ISBN TO ADD An Item");
                }
            } else {
                return badRequest("Form not Filled. Please Fill All Fields");

            }
        }
    }

// method to return a dvd
    public Result returnDVD() throws Exception {
        JsonNode body = request().body().asJson();
        if (body != null) {
            if (body.findPath("isbn") != null || body.findPath("returned_date") != null || body.findPath("time") != null || !body.findPath("isbn").textValue().equals("") || !body.findPath("returned_date").textValue().equals("") || !body.findPath("time").textValue().equals("")) {
                String isbn = body.findPath("isbn").textValue();
                String returnedDate_string_val = body.findPath("returned_date").textValue();
                List<String> rawBorrowedDate = Arrays.asList(returnedDate_string_val.split("-"));
                String borrowedTime_json_val = body.findPath("time").textValue();
                List<String> rawBorrowedTime = Arrays.asList(borrowedTime_json_val.split(":"));
                DateTime date = new DateTime(Integer.valueOf(rawBorrowedDate.get(2)), Integer.valueOf(rawBorrowedDate.get(1)),
                        Integer.valueOf(rawBorrowedDate.get(0)), Integer.valueOf(rawBorrowedTime.get(0)), Integer.valueOf(rawBorrowedTime.get(0)));

                westminster_library_manager.returnDVD(isbn, date);
                return ok("DVD successfully Returned");
            } else {
                return badRequest("All Data Not Filled!\nPlease Fill All Data");
            }
        } else {
            return badRequest("Invalid Submission!\n Please Complete All Fields");
        }
    }
    //Method to return a book
    public Result returnBook() throws Exception {
        JsonNode body = request().body().asJson();
        if (body != null) {
            if (body.findPath("isbn") != null || body.findPath("returned_date") != null || body.findPath("time") != null
                    || !body.findPath("isbn").textValue().equals("") || !body.findPath("returned_date").textValue().equals("") || !body.findPath("time").textValue().equals("")) {
                String isbn = body.findPath("isbn").textValue();
                String returnedDate_string_val = body.findPath("returned_date").textValue();
                List<String> rawBorrowedDate = Arrays.asList(returnedDate_string_val.split("-"));
                String borrowedTime_json_val = body.findPath("time").textValue();
                List<String> rawBorrowedTime = Arrays.asList(borrowedTime_json_val.split(":"));
                DateTime date = new DateTime(Integer.valueOf(rawBorrowedDate.get(2)), Integer.valueOf(rawBorrowedDate.get(1)),
                        Integer.valueOf(rawBorrowedDate.get(0)), Integer.valueOf(rawBorrowedTime.get(0)), Integer.valueOf(rawBorrowedTime.get(0)));

                westminster_library_manager.returnBook(isbn, date);

                return ok("Book Successfully Returned");
            } else {
                return badRequest("Please Fill complete the form");
            }
        } else {
            return badRequest("ERROR!\nNO DATA SUBMITTED");
        }

    }
    //Method to borrow a book
    public Result borrowBook() throws Exception {
        JsonNode body = request().body().asJson();
        if (body != null) {
            if (body.findPath("date") != null || body.findPath("time") != null || body.findPath("isbn") != null || body.findPath("id") != null || !body.findPath("date").textValue().equals("") || !body.findPath("time").textValue().equals("") || !body.findPath("isbn").textValue().equals("") || !body.findPath("id").textValue().equals("")) {
                String borrowedDate_string_val = body.findPath("date").textValue();
                List<String> rawBorrowedDate = Arrays.asList(borrowedDate_string_val.split("-"));
                String borrowedTime_json_val = body.findPath("time").textValue();
                List<String> rawBorrowedTime = Arrays.asList(borrowedTime_json_val.split(":"));

                DateTime borrowedDate = new DateTime(Integer.valueOf(rawBorrowedDate.get(2)),
                        Integer.valueOf(rawBorrowedDate.get(1)),
                        Integer.valueOf(rawBorrowedDate.get(0)),
                        Integer.valueOf(rawBorrowedTime.get(0)),
                        Integer.valueOf(rawBorrowedTime.get(1)));
                String isbn = body.findPath("isbn").textValue();
                String readerID = body.findPath("id").textValue();


                Map<String, Object> date = new HashMap<>();
                date.put("date", borrowedDate.toString());
                date.put("day", borrowedDate.getDay());
                date.put("hour", borrowedDate.getHour());
                date.put("minute", borrowedDate.getMinute());
                date.put("month", borrowedDate.getMonth());
                date.put("year", borrowedDate.getYear());
                westminster_library_manager.borrowBook(isbn, readerID, date);
                return ok("Book Successfully Borrowed");
            } else {
                return badRequest("Please Fill All Fields");
            }
        } else {
            return badRequest("DATA NOT FILLED");
        }

    }
    //Method to borrow a dvd
    public Result borrowDVD() throws Exception {
        JsonNode body = request().body().asJson();
        if (body == null) {
            return badRequest("No Data Added");
        } else {
            if (body.findPath("date") == null || body.findPath("time") == null || body.findPath("isbn") == null & body.findPath("id") == null || body.findPath("date").textValue().equals("") || body.findPath("time").textValue().equals("") || body.findPath("isbn").textValue().equals("") & body.findPath("id").textValue().equals("")) {
                return badRequest("Please Complete All Fields");
            } else {
                String borrowedDate_string_val = body.findPath("date").textValue();
                List<String> rawBorrowedDate = Arrays.asList(borrowedDate_string_val.split("-"));
                String borrowedTime_json_val = body.findPath("time").textValue();
                List<String> rawBorrowedTime = Arrays.asList(borrowedTime_json_val.split(":"));

                DateTime borrowedDate = new DateTime(Integer.valueOf(rawBorrowedDate.get(2)),
                        Integer.valueOf(rawBorrowedDate.get(1)),
                        Integer.valueOf(rawBorrowedDate.get(0)),
                        Integer.valueOf(rawBorrowedTime.get(0)),
                        Integer.valueOf(rawBorrowedTime.get(1)));
                String isbn = body.findPath("isbn").textValue();
                String readerID = body.findPath("id").textValue();


                Map<String, Object> date = new HashMap<>();
                date.put("date", borrowedDate.toString());
                date.put("day", borrowedDate.getDay());
                date.put("hour", borrowedDate.getHour());
                date.put("minute", borrowedDate.getMinute());
                date.put("month", borrowedDate.getMonth());
                date.put("year", borrowedDate.getYear());
                westminster_library_manager.borrowDVD(isbn, readerID, date);


                return ok("DVD Successfully Borrowed");
            }
        }

    }
    //Method to add a dvd
    public Result addDVD() throws Exception {
        JsonNode body = request().body().asJson();
        if (body == null) {
            return badRequest("Expecting Json data");
        } else {
            if (body.findPath("isbn") == null || body.findPath("title") == null || body.findPath("genre") == null || body.findPath("producer") == null) {
                return badRequest("Please Fill All Fields");
            } else {
                if (checkIsbn(body.findPath("isbn").textValue())) {


                    String isbn = body.findPath("isbn").textValue();
                    String title = body.findPath("title").textValue();
                    String genre = body.findPath("genre").textValue();
                    String producer_name = body.findPath("producer").textValue();
                    westminster_library_manager.addDVD(isbn, title, genre, new DateTime(0, 0, 0), producer_name);

                    return ok("DVD added successfully");
                } else {
                    return badRequest("Invalid ISBN\nPlease Add A Valid ISBN TO ADD An Item");
                }
            }

        }
    }
    //Method to add a reader
    public Result addReader() throws IOException {
        JsonNode body = request().body().asJson();
        if (body == null) {
            return badRequest("Expecting Json data");
        } else {
            String name = body.findPath("readerName").textValue();
            String mobile_number = body.findPath("number").textValue();
            String email = body.findPath("email").textValue();
            FirebaseInit.initialize();
            FirebaseInit.createReader(new Reader(name, mobile_number, email));
            return ok("Reader successfully added!");
        }
    }

    //Method to delete a book
    public Result deleteBook() throws Exception {
        JsonNode body = request().body().asJson();
        String isbn = body.findPath("isbn").textValue();
        if (isbn == null || isbn.equals("")) {
            return badRequest("Data Not Filled");
        } else {

            westminster_library_manager.deleteBook(isbn);
            return ok("Book Successfully Deleted");
        }
    }

    //Method to delete a DVD
    public Result deleteDVD() throws Exception {
        JsonNode body = request().body().asJson();
        String isbn = body.findPath("isbn").textValue();

        if (isbn == null || isbn.equals("")) {
            return badRequest("Data Not Filled");
        } else {
            westminster_library_manager.deleteDVD(isbn);
            return ok("DVD Successfully Deleted");
        }
    }
    //Method to get the Report
    public Result getReport() throws Exception {
        FirebaseInit.initialize();
        JsonNode body = Json.toJson(FirebaseInit.getReport());
        if (body == null) {
            return badRequest("No Data Found");

        } else {
            return ok(body).as("application/json");
        }
    }
    //Method
    public Result getAllBooks() throws Exception {
        FirebaseInit.initialize();


        JsonNode body = Json.toJson(FirebaseInit.getAllBooks());

        if (body == null) {
            return badRequest("Expecting Json Data");
        } else {
            return ok(body).as("application/json");
        }
    }

    public Result getAllReaders() throws Exception {
        FirebaseInit.initialize();
        JsonNode body = Json.toJson(FirebaseInit.getAllReaders());
        if (body == null) {
            return badRequest("Expecting Json Data");
        } else {
            return ok(body).as("application/json");
        }
    }

    public Result getAllDVDs() throws Exception {
        FirebaseInit.initialize();


        JsonNode body = Json.toJson(FirebaseInit.getAllDVDs());

        if (body == null) {
            return badRequest("Expecting Json Data");
        } else {
            return ok(body).as("application/json");
        }
    }

}


class AppSummary {
    private String content;

    AppSummary(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

