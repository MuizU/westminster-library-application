import * as React from 'react';
import axios from "axios"
import {Row} from "react-bootstrap";
import {IconButton, Select, Snackbar, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Book from "../library-items/Book";
import {MenuItem, Button} from "@material-ui/core";
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

class DeleteBook extends React.PureComponent<WithStyles<typeof styles>, IDeleteBook> {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            delete_book_isbn: "",
            response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},

            open: false,
        }

    }


    componentWillMount(): any {
        axios.get('http://localhost:9000/api/getBook')
            .then(res => {
                const retrievedBooks = res.data;
                this.setState({books: retrievedBooks});

            }).catch(error => {
            console.log(error.response)
        })

    }


    handleSubmit = event => {
        event.preventDefault();
        this.setState({open: true});

            const isbn = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    isbn: this.state.delete_book_isbn,
                }
            };
            axios.post('http://localhost:9000/api/DeleteBook', isbn)
                .then(res => {
                    console.log(res);
                    console.log(res.data);

                    this.setState({response: res.data});

                }).catch(error => {
                console.log(error.response);
                this.setState({response: error.response});


            });

    };

    handleClose = () => {

        this.setState({open: false});
    };

    render() {


        return (
            <div className={"DeleteBook"}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <h1>Delete Book</h1>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <Row className={this.props.classes.row}>

                        <Select required={true}
                                value={this.state.delete_book_isbn}
                                onChange={e => this.setState({delete_book_isbn: e.target.value})}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {this.state.books.map(book =>
                                <MenuItem value={book.isbn} key={book.isbn}>{book.isbn} - {book.title}</MenuItem>
                            )}
                        </Select>
                    </Row>
                    <Row className={this.props.classes.row}>

                        <Button variant="contained" color="primary" type="submit" className={this.props.classes.button}>Delete
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
                </form>


            </div>

        );

    }

}

interface IDeleteBook {
    books: Book[];
    delete_book_isbn: string;
    open:boolean;
    response:any;
}

export default withStyles(styles)(DeleteBook);