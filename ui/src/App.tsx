import * as React from 'react';
import * as moment from "moment";
import './App.css';
import logo from './logo.svg';
import axios from 'axios';

class App extends React.Component<{}, IsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            bookIsbn: "",
            bookDeleteIsbn: "",
            authorName: "",
            bookTitle: "",
            bookGenre: "",
            dvdIsbn: "",
            dvdDeleteIsbn: "",
            dvdName: "",
            producer: "",
            dvdTitle: "",
            dvdGenre: "",
            dateBorrowed: new Date(),
            dateReturned: new Date(),
            borrowShow: false,
            returnShow: false,
            borrowerName: "",
            bookBorrowIsbn: '',
            dvdBorrowIsbn: '',
            tableISBN: "",
            tablePrice: 0


        }

    }


    handleAddBookSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (this.state.bookIsbn !== "" && this.state.bookTitle !== "" && this.state.bookGenre !== "" && this.state.authorName !== "") {
            const bookItem = {
                isbn: this.state.bookIsbn,
                title: this.state.bookTitle,
                genre: this.state.bookGenre,
                authorName: this.state.authorName,

            };

            axios.post(`http://localhost:3000`, {bookItem})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                });

            this.setState({
                bookTitle: "",
                bookIsbn: "",
                bookGenre: "",
                authorName: "",


            });

        } else {
            alert("Please fill all values")
        }
    }

    handleBorrowBookSubmit(e: React.FormEvent<HTMLFormElement>, book: any): void {
        e.preventDefault();

        if ((this.state.dateBorrowed != null && this.state.borrowerName !== "")) {

            book.borrowed = false;
            book.borrowed = true;
            book.borrowedDate = this.state.dateBorrowed;
            book.borrowerName = this.state.borrowerName;
            this.setState({
                borrowShow: false,
                dateBorrowed: null,
                borrowerName: ""


            })


        } else {
            alert("Book hasn't been Borrowed")

        }

    }

    handleAddDVDSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (this.state.dvdIsbn !== "" && this.state.dvdTitle !== "" && this.state.dvdGenre !== ""&&this.state.producer!=="") {
            const dvdItem = {
                isbn:this.state.dvdIsbn,
                title:this.state.dvdTitle,
                genre:this.state.dvdGenre,
                producer:this.state.producer,
            };
            axios.post('http://localhost:3000',dvdItem).then(res => {
                console.log(res);
                console.log(res.data);
            });
            this.setState({
                dvdTitle: "",
                dvdIsbn: "",
                dvdGenre: "",
                producer: ""

            });
        } else {
            alert("Please complete all fields")
        }


    }


    deleteBook(e:React.FormEvent<HTMLFormElement>,delete_isbn: number): void {
        e.preventDefault();
        // TODO change this so the BOOK GETS DELETED
        axios.delete('http://localhost:3000').then(res => {
            console.log(res);
            console.log(res.data);
        });


    }

    deleteDvd(e:React.FormEvent<HTMLFormElement>,delete_dvd_isbn: number): void {
        e.preventDefault();
        // TODO CHANGE THIS SO THAT THE DVD GETS DELETED

        axios.delete('http://localhost:3000').then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    showBorrowModal() {
        this.setState({
            ...this.state,
            borrowShow: !this.state.borrowShow
        })
    };

    showReturnModal() {
        this.setState({
            ...this.state,
            returnShow: !this.state.returnShow
        })
    }

    handleBorrowDvdSubmit(e: React.FormEvent<HTMLFormElement>, dvd: any): void {
        if ((this.state.dateBorrowed != null && this.state.borrowerName !== "")) {

            dvd.borrowed = false;
            dvd.borrowed = true;
            dvd.borrowedDate = App.parseDate(this.state.dateBorrowed);
            dvd.borrowerName = this.state.borrowerName;
            this.setState({
                borrowShow: false,
                dateBorrowed: null,
                borrowerName: ""


            })


        } else {
            alert("DVD hasn't been Borrowed")

        }
    }


    renderDVDs(): any {// JSX.Element[] {
        /*return this.state.dvdItems.map((dvd: DVD, isbn: number) => {
            return (
                <div key={isbn}>
                    <span>{dvd.isbn}</span>
                    <button onClick={() => this.deleteDvd(dvd.isbn)}>Delete DVD</button>
                    <button onClick={() => this.showBorrowModal}>Borrow DVD</button>
                    <Modal show={this.state.borrowShow} onClose={this.showBorrowModal}>
                        <form onSubmit={e => this.handleBorrowDvdSubmit(e, dvd)}>
                            <h1 className={"App-borrow-Title"}>Borrow Book</h1>
                            <label>Reader name: <input type={"text"}
                                                       onChange={e => this.setState({borrowerName: e.target.value})}
                                                       value={this.state.borrowerName}/></label>
                            <label> Date Borrowed: <input type={"Date"}
                                                          onChange={e => this.setState({dateBorrowed: e.target.value})}
                                                          value={this.state.dateBorrowed}/></label>
                            <button type={"submit"}>Borrow Book
                            </button>
                        </form>

                    </Modal>
                    <button onClick={() => this.showReturnModal()}>Return Book</button>
                    <Modal show={this.state.returnShow} onClose={() => this.showReturnModal()}>
                        <form onSubmit={e => this.handleReturnDVDSubmit(e, dvd)}>
                            <h1 className={"App-borrow-Title"}>Return Book</h1>
                            <label>returned Date:
                                <input type={"date"} onChange={e => this.setState({dateReturned: e.target.value})}
                                       value={this.state.dateReturned}/></label>
                            <button type={"submit"}>Return book
                            </button>
                        </form>
                    </Modal>
                </div>
            )
        })*/
    }

    renderBooks(): any {// JSX.Element[] {
        // return this.state.bookItems.map((book: Book, isbn: number) => {
        //     return (
        //         <div key={isbn}>
        //             <span>{book.isbn} - {book.title} </span>
        //             <button onClick={() => this.deleteBook(book.isbn)}>Delete Book</button>
        //
        //             <button onClick={() => this.showBorrowModal()}>Borrow Book</button>
        //             <Modal onClose={() => this.showBorrowModal()} show={this.state.borrowShow}>
        //                 <form onSubmit={e => this.handleBorrowBookSubmit(e, book)}>
        //                     <h1 className={"App-borrow-Title"}>Borrow Book</h1>
        //                     <label>Reader name: <input type={"text"}
        //                                                onChange={e => this.setState({borrowerName: e.target.value})}
        //                                                value={this.state.borrowerName}/></label>
        //                     <label> Date Borrowed: <input type={"date"}
        //                                                   onChange={e => this.setState({dateBorrowed: e.target.value})}
        //                                                   value={this.state.dateBorrowed}/></label>
        //                     <button type={"submit"}>Borrow Book
        //                     </button>
        //                 </form>
        //             </Modal>
        //             <button onClick={() => this.showReturnModal()}>Return Book</button>
        //             <Modal show={this.state.returnShow} onClose={() => this.showReturnModal()}>
        //                 <form onSubmit={e => this.handleReturnBookSubmit(e, book)}>
        //                     <h1 className={"App-borrow-Title"}>Return Book</h1>
        //                     <label>returned Date:
        //                         <input type={"date"} onChange={e => this.setState({dateReturned: e.target.value})}
        //                                value={this.state.dateReturned}/></label>
        //                     <button type={"submit"}>Return book
        //                     </button>
        //                 </form>
        //             </Modal>
        //         </div>
        //     );
        //
        //
        // })

    }

    static parseDate(inputDate: string): Date {

        const date: string[] = inputDate.split("-");
        return new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
    }

    handleReturnDVDSubmit(e: React.FormEvent<HTMLFormElement>, dvd: any): void {
        e.preventDefault();
        if (dvd.borrowed) {

            dvd.returnedDate = App.parseDate(this.state.dateReturned);
            const numberOfDays = moment(dvd.returnedDate).diff(moment(dvd.borrowedDate), 'days');
            if (numberOfDays > 3 && numberOfDays < 6) {
                const price: number = (((numberOfDays - 7) * 24) * 0.2);
                alert("You have to pay a late fee of £" + price);
                // this.state.tableItems.set(dvd, price)
            } else if (numberOfDays > 6) {
                const price: number = (3 * 24 * 0.2) + ((moment(dvd.returnedDate)
                    .diff(moment(moment(new Date(dvd.borrowedDate)).add(7, 'days')), 'hours')) * 0.5);
                alert("You have to pay a late fee of £" + price);
                // this.state.tableItems.set(dvd, price)

            }
            this.setState({
                dateReturned: new Date(),
                borrowerName: "",
                dateBorrowed: new Date()
            })
        } else {
            alert("Book hasn't been borrowed")
        }
    }

    handleReturnBookSubmit(e: React.FormEvent<HTMLFormElement>, book: any): void {
        e.preventDefault();
        if (book.borrowed) {

            book.returnedDate = App.parseDate(this.state.dateReturned);
            const numberOfDays = moment(book.returnedDate).diff(moment(book.borrowedDate), 'days');
            if (numberOfDays > 7 && numberOfDays < 10) {
                const price: number = (((numberOfDays - 7) * 24) * 0.2);
                alert("You have to pay a late fee of £" + price);
                // this.state.tableItems.set(book, price)
            } else if (numberOfDays > 10) {
                const price: number = (3 * 24 * 0.2) + ((moment(book.returnedDate).diff(moment(moment(new Date(book.borrowedDate)).add(11, 'days')), 'hours')) * 0.5);
                alert("You have to pay a late fee of £" + price);
                // this.state.tableItems.set(book, price)

            }
            this.setState({
                dateReturned: new Date(),
                borrowerName: "",
                dateBorrowed: new Date()
            })
        } else {
            alert("Book hasn't been borrowed")
        }
    }


    render()
        :
        JSX.Element {

        return (
            <div className="App">
                <header className="App-header">
                    {<img src={logo} className="App-logo" alt="logo"/>}
                    <h1 className="App-title">Welcome to The Library Menu</h1>
                </header>
                <div id={"add items"}>
                    <h1 className={"App-intro"}>Add new Items</h1>
                    <form onSubmit={e => this.handleAddBookSubmit(e)} name={"book-form"} className={"App-li"}>
                        <h1 className={"App-LITypes"}>Add Book</h1>
                        <label>
                            ISBN:
                            <input value={this.state.bookIsbn}
                                   onChange={e => this.setState({bookIsbn: e.target.value})}
                                   type="number" name="book-isbn"/>
                        </label>
                        <label>
                            Book Title:
                            <input value={this.state.bookTitle}
                                   onChange={e => this.setState({bookTitle: e.target.value})}
                                   type="text" name="book-title"/>
                        </label>
                        <label>
                            Genre:
                            <input value={this.state.bookGenre}
                                   onChange={e => this.setState({bookGenre: e.target.value})}
                                   type="text" name="book-genre"/>
                        </label>
                        <label>
                            Author Name:
                            <input value={this.state.authorName}
                                   onChange={e => this.setState({authorName: e.target.value})}
                                   type="text" name="book-author"/>
                        </label>
                        <button type="submit" value="Add Book">Add Book</button>
                    </form>
                    <div key={"App-Below-form"}>
                        <h1>Books in Library: </h1>
                        <section>{this.renderBooks()}</section>
                    </div>
                    <form onSubmit={e => this.handleAddDVDSubmit(e)} className={"App-li"} name={"dvd-form"}>
                        <h1 className={"App-LITypes"}>Add DVD</h1>
                        <label>
                            ISBN:
                            <input value={this.state.dvdIsbn}
                                   onChange={e => this.setState({dvdIsbn: e.target.value})}
                                   type="number" name="dvd-isbn"/>
                        </label>
                        <label>
                            DVD Title:
                            <input value={this.state.dvdTitle}
                                   onChange={e => this.setState({dvdTitle: e.target.value})}
                                   type="text" name="dvd-title"/>
                        </label>
                        <label>
                            Genre:
                            <input value={this.state.dvdGenre}
                                   onChange={e => this.setState({dvdGenre: e.target.value})}
                                   type="text" name="dvd-genre"/>
                        </label>
                        <label>
                            Director Name:
                            <input value={this.state.producer}
                                   onChange={e => this.setState({producer: e.target.value})}
                                   type="text" name="director"/>
                        </label>
                        <button type="submit" value="Add DVD">Add DVD</button>
                    </form>
                    <h1>DVDs in Library</h1>
                    <section>{this.renderDVDs()}</section>
                </div>


                {/*TODO Make the Table for the items to be displayed*/}
            </div>

        );


    }
}

interface IsState {
    bookIsbn: string

    bookDeleteIsbn: string

    authorName: string

    bookTitle: string

    bookGenre: string

    dvdIsbn: string

    dvdDeleteIsbn: string

    dvdName: string

    producer: string

    dvdTitle: string

    dvdGenre: string

    dateBorrowed: any
    dateReturned: any
    borrowShow: boolean;
    returnShow: boolean
    borrowerName: string;
    bookBorrowIsbn: string;
    dvdBorrowIsbn: string
    tableISBN: string,
    tablePrice: number
}

export default App;

