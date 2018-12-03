import * as React from 'react';
import {IconButton, Input, MenuItem, Paper, Select, Snackbar, TextField, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Book from "../library-items/Book";
import axios from "axios";
import {Row} from "react-bootstrap";
import {Button, InputLabel} from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";


const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '85%',
            marginTop: theme.spacing.unit * 6,
            marginLeft: theme.spacing.unit * 10,
            marginRight: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 6,
            alignItems: 'center'

        },
        row: {
            marginTop: 50
        },
        container: {
            flexWrap: 'wrap',
            flexDirection: 'row'

        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,
            marginHeight: 200


        },
        button: {
            margin: theme.spacing.unit,
            marginBottom: 30

        },
        resize: {
            fontSize: 500
        },
        selectEmpty: {
            marginTop: theme.spacing.unit * 2,
        },
        close: {
            padding: theme.spacing.unit / 2,
        },
    });

export class BorrowBook extends React.PureComponent<WithStyles<typeof styles>, IBorrowBook> {
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            reader_id: "",
            books: [],
            readers: [{readerID: "", readerName: "", mobileNumber: "", email: "email"}],
            date_borrowed: "",
            time_borrowed: "",
            availableBooks: [],
            response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},
            open: false,
        }
    }


    componentWillMount() {
        axios.get('http://localhost:9000/api/getBook')
            .then(res => {
                const retrievedBooks = res.data;
                this.setState({books: retrievedBooks});
                this.state.books.forEach(value => {
                    if (!value.borrowed) {
                        this.state.availableBooks.push(value)
                    }
                });
            }).catch(error => {
            console.log(error.response)
        });
        this.state.readers.map(reader => {
            console.log(reader.readerName)
        });
        axios.get('http://localhost:9000/api/getReader')
            .then(res => {
                const retrievedReaders = res.data;
                this.setState({readers: retrievedReaders});

            }).catch(error => {
            console.log(error.response)
        })
    }
    handleClose = () => {

        this.setState({open: false});
    };

    handleBorrowBookSubmit(e) {
        e.preventDefault();
        this.setState({open:true})
        const borrowDetails = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    isbn: this.state.isbn,
                    id: this.state.reader_id,
                    date: this.state.date_borrowed,
                    time: this.state.time_borrowed
                }
            };

            axios.post('http://localhost:9000/api/BorrowBook', borrowDetails)
                .then(res => {
                    console.log(res);
                    this.setState({response: res});

                }).catch(error => {
                console.log(error.response);
                this.setState({response: error.response});

            });

            this.setState({
                isbn: "",
                reader_id: "",
                date_borrowed: "",
                time_borrowed: "",
            })

    }

    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <h1>Borrow Book</h1>
                <Paper className={this.props.classes.root}>
                    <form onSubmit={e => this.handleBorrowBookSubmit(e)}>
                        <Row className={this.props.classes.row}>
                            <Row>
                                <InputLabel htmlFor={"books-tag"}>
                                    Select Book
                                </InputLabel>
                            </Row>
                            <Select required={true} input={<Input name="books" id="books-tag"/>}
                                    inputProps={{name: "Books"}}
                                    value={this.state.isbn}
                                    onChange={e => this.setState({isbn: e.target.value})} name={"select"}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.availableBooks.map(book =>

                                    <MenuItem value={book.isbn} key={book.isbn}>{book.isbn} | {book.title}</MenuItem>
                                )}
                            </Select>
                        </Row>
                        <Row className={this.props.classes.row}>
                            <Row>

                                <InputLabel htmlFor={"reader-tag"}>
                                    Select Reader
                                </InputLabel>
                            </Row>
                            <Select required={true} input={<Input name="reader" id="reader-tag"/>}
                                    inputProps={{name: "readers"}}
                                    value={this.state.reader_id}
                                    onChange={e => this.setState({reader_id: e.target.value})} name={"select"}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.readers.map(reader =>
                                    <MenuItem value={reader.readerID}
                                              key={reader.readerID}>{reader.readerID} | {reader.readerName}</MenuItem>
                                )}
                            </Select>
                        </Row>
                        <Row className={this.props.classes.row}>
                            <TextField
                                required={true}
                                label="Date Borrowed"
                                type="date"
                                value={this.state.date_borrowed}
                                className={this.props.classes.textField}
                                onChange={e => this.setState({date_borrowed: e.target.value})}
                            />
                            <TextField
                                required={true}
                                label="Time Borrowed"
                                type="time"
                                value={this.state.time_borrowed}
                                className={this.props.classes.textField}
                                inputProps={{
                                    step: 300,
                                }}
                                onChange={event => this.setState({time_borrowed: event.target.value})}
                            />
                        </Row>
                        <Row className={this.props.classes.row}>

                            <Button color="primary" variant="contained" type="submit"
                                    className={this.props.classes.button}>Borrow
                                Book</Button>
                        </Row>

                    </form>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={() => this.handleClose()}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.response.data}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={this.props.classes.close}
                            onClick={() => this.handleClose()}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}


interface IBorrowBook {
    isbn: string;
    reader_id: string;
    books: Book[];
    availableBooks: Book[]
    readers: any
    date_borrowed: string;
    time_borrowed: string;
    response: any;
    open: boolean;
}

export default withStyles(styles)(BorrowBook);