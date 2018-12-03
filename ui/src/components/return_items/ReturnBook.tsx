import * as React from 'react';
import {IconButton, Input, MenuItem, Paper, Select, Snackbar, TextField, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Book from "../library-items/Book";
import axios from "axios";
import {Row} from "react-bootstrap";
import {Button, InputLabel} from '@material-ui/core'
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from '@material-ui/icons/Close';

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
        close: {
            padding: theme.spacing.unit / 2,
        },
    });

export class ReturnBook extends React.PureComponent<WithStyles<typeof styles>, IReturnBook> {
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            reader_id: "",
            books: [],
            readers: [{readerID: "", readerName: "", mobileNumber: "", email: "email"}],
            date_returned: "",
            time_returned: "",
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
                    if (value.borrowed) {
                        this.state.availableBooks.push(value)
                    }
                });
            }).catch(error => {
            console.log(error.response)
        });

        axios.get('http://localhost:9000/api/getReader')
            .then(res => {
                const retrievedReaders = res.data;
                this.setState({readers: retrievedReaders});

            }).catch(error => {
            console.log(error.response)

        });
    }

    handleBorrowBookSubmit(e) {
        e.preventDefault();
        this.setState({open: true});
        const returnDetails = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                isbn: this.state.isbn,
                returned_date: this.state.date_returned,
                time: this.state.time_returned
            }
        };

        axios.post('http://localhost:9000/api/returnBook', returnDetails)
            .then(res => {
                console.log(res.data);

                this.setState({response: res});

            }).catch(error => {
            console.log(error.response.data);
            this.setState({response: error.data});

        });

        this.setState({
            isbn: "",
            date_returned: "",
            time_returned: "",
        })

    }

    handleClose = () => {

        this.setState({open: false});
    };

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <h1>Return Book</h1>
                <Paper className={this.props.classes.root}>
                    <form onSubmit={e => this.handleBorrowBookSubmit(e)}>
                        <Row className={classes.row} required={true}>
                            <Row>
                                <InputLabel htmlFor={"book-tag"}>
                                    Select Book
                                </InputLabel>
                            </Row>
                            <Select required={true}
                                    input={<Input name="book" id="book-tag"/>}
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

                        <Row className={classes.row}>
                            <TextField
                                required={true}
                                label="Date Borrowed"
                                type="date"
                                value={this.state.date_returned}
                                className={classes.textField}
                                onChange={e => this.setState({date_returned: e.target.value})}
                            />
                            <TextField
                                required={true}
                                label="Time Borrowed"
                                type="time"
                                value={this.state.time_returned}
                                className={classes.textField}
                                inputProps={{
                                    step: 300,
                                }}
                                onChange={event => this.setState({time_returned: event.target.value})}
                            />
                        </Row>
                        <Row className={classes.row}>

                            <Button color="primary" variant="contained" type="submit" className={classes.button}>Borrow
                                Book</Button>
                        </Row>
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
                            message={<span id="message-id">{this.state.response}</span>}
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
                    </form>
                </Paper>
            </div>
        );
    }
}


interface IReturnBook {
    isbn: string;
    reader_id: string;
    books: Book[];
    availableBooks: Book[]
    readers: any;
    response: any;
    open: boolean;
    date_returned: string;
    time_returned: string;


}

export default withStyles(styles)(ReturnBook);