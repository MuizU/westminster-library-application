import * as React from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";
import DeleteBook from "../delete_item/DeleteBook";
import AddDVD from "../add_item/AddDVD";
import AddBook from "../add_item/AddBook";
import {BrowserRouter as Router, Route} from "react-router-dom";
import DeleteDVD from "../delete_item/DeleteDVD";
import DisplayBooks from "../display_items/DisplayBooks";
import DisplayDVDs from "../display_items/DisplayDVDs";
import CreateReader from "../create_reader/CreateReader";
import BorrowBook from "../borrow_items/BorrowBook";
import BorrowDVD from "../borrow_items/BorrowDVD"
import ReturnBook from "../return_items/ReturnBook";
import ReturnDVD from "../return_items/ReturnDVD";
import Report from "../Generate Report/Report";
import {HomePage} from "../HomePage";

class LibraryNavbar extends React.PureComponent {


    render() {
        return (
            <div className={"App"}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <Navbar inverse={true} collapseOnSelect={true}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href={"/"}>Library Menu</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavDropdown eventKey={1} title="Add Item" id="basic-nav-dropdown">
                                <MenuItem href={"AddBook"} eventKey={1.1}>Add Book</MenuItem>

                                <MenuItem divider={true}/>
                                <MenuItem href={"AddDVD"} eventKey={1.2}>Add DVD</MenuItem>
                            </NavDropdown>
                            <NavDropdown eventKey={2} title={"Delete Item"} id={"basic-nav-dropdown"}>
                                <MenuItem href={"DeleteBook"} eventKey={2.1}>Delete Book</MenuItem>
                                <MenuItem divider={true}/>
                                <MenuItem href={"DeleteDVD"} eventKey={2.2}>Delete DVD</MenuItem>
                            </NavDropdown>
                            <NavDropdown eventKey={3} title={"Display Items"} id={"basic-nav-dropdown"}>
                                <MenuItem href={"DisplayBooks"} eventKey={3.1}>Display Books</MenuItem>
                                <MenuItem divider={true}/>
                                <MenuItem href={"DisplayDVDs"} eventKey={3.2}>Display DVDs</MenuItem>
                            </NavDropdown>
                            <NavDropdown eventKey={4} title="Borrow Item" id="basic-nav-dropdown">
                                <MenuItem href={"BorrowBook"} eventKey={4.1}>Borrow Book</MenuItem>
                                <MenuItem divider={true}/>
                                <MenuItem href={"BorrowDVD"} eventKey={4.2}>Borrow DVD</MenuItem>
                            </NavDropdown>
                            <NavDropdown eventKey={5} title="Return Item" id="basic-nav-dropdown">
                                <MenuItem href={"ReturnBook"} eventKey={5.1}>Return Book</MenuItem>
                                <MenuItem divider={true}/>
                                <MenuItem href={"ReturnDVD"} eventKey={5.2}>Return DVD</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight={true}>
                            <NavItem eventKey={1} href="CreateReader">
                                Create Reader Account
                            </NavItem>
                            <NavItem eventKey={2} href="GenerateReport">
                                Generate Overdue Fee Report
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Router>
                    <div>
                        <Route path={"/AddBook"} component={AddBook}/>
                        <Route path={"/AddDVD"} component={AddDVD}/>
                        <Route path={"/DeleteBook"} component={DeleteBook}/>
                        <Route path={"/DeleteDVD"} component={DeleteDVD}/>
                        <Route path={"/DisplayBooks"} component={DisplayBooks}/>
                        <Route path={"/DisplayDVDs"} component={DisplayDVDs}/>
                        <Route path={"/CreateReader"} component={CreateReader}/>
                        <Route path={"/BorrowBook"} component={BorrowBook}/>
                        <Route path={"/BorrowDVD"} component={BorrowDVD}/>
                        <Route path={"/ReturnBook"} component={ReturnBook}/>
                        <Route path={"/ReturnDVD"} component={ReturnDVD}/>
                        <Route path={"/GenerateReport"} component={Report}/>
                        <Route path={"/"} exact={true} strict={true} component={HomePage}/>
                    </div>
                </Router>
            </ div>
        );
    }
}

export default LibraryNavbar;