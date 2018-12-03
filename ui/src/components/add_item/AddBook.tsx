import * as React from 'react';
import axios from "axios";
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import {Modal, Row} from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import {Button as RealButton} from 'react-bootstrap';
import {Button, IconButton, InputLabel, Paper, Snackbar} from '@material-ui/core';
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
            marginTop: 50,
            marginBottom: 50
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
        authorField: {
            marginLeft: theme.spacing.unit * 15,
            marginRight: theme.spacing.unit,
            width: 200,


        },
        button: {
            margin: theme.spacing.unit,
            marginBottom: theme.spacing.unit * 10,

        },
        resize: {
            fontSize: 500
        },
        close: {
            padding: theme.spacing.unit / 2,
        },
    });


class AddBook extends React.PureComponent<WithStyles<typeof styles>> {
    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this);

    }

    state = {
        book_isbn: "",
        book_title: "",
        book_genre: "",
        book_publishedDate: "",
        book_authors: [],
        publisher: "",
        number_of_pages: "",
        first_author: "",
        number_of_books_coll: 0,
        show: false,
        response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},
        open: false,
    };


    handleAddBookSubmit(e): void {
        if (this.state.number_of_books_coll <= 100) {
            e.preventDefault();
            this.setState({open: true});


            const bookItem = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                    isbn: this.state.book_isbn,
                    title: this.state.book_title,
                    genre: this.state.book_genre,
                    pubDate: this.state.book_publishedDate,
                    authors: this.state.book_authors.toString(),
                    publisher: this.state.publisher,
                    numPages: this.state.number_of_pages
                }

            };

            axios.post('http://localhost:9000/api/Book', bookItem)
                .then(res => {
                    console.log(res);
                    this.setState({response: res});

                }).catch(error => {
                console.log(error.response);
                this.setState({response: error.response});

            });

            this.setState({
                book_isbn: "",
                book_title: "",
                book_genre: "",
                book_publishedDate: "",
                book_authors: [],
                publisher: "",
                number_of_pages: "",
                first_author: "",
            });
        }

    }

    handleClose = () => {

        this.setState({open: false});
    };


    handleAuthorFieldChange(e, index) {
        // @ts-ignore
        this.state.book_authors[index] = e.target.value;
        this.setState({book_authors: this.state.book_authors})
    }

    addAuthor(e) {
        e.preventDefault();
        if (this.state.book_authors.length === 1) {
            // @ts-ignore
            this.state.book_authors.push(this.state.first_author)
        }
        // @ts-ignore
        this.setState((prevState) => ({book_authors: [...prevState.book_authors, [""]]}))
    }

    firstAuthorName() {
        if (this.state.book_authors.length === 0) {
            return "";
        } else {
            return "1";
        }
    }

    handleHide() {
        this.setState({show: false})
    }

    handleRemoveAuthorField(index) {
        this.state.book_authors.splice(index, 1);
        this.setState({book_authors: this.state.book_authors})
    }

    componentWillMount(): void {
        axios.get('http://localhost:9000/api/getBook')
            .then(res => {
                const retrievedBooks = res.data;
                this.setState({number_of_books_coll: retrievedBooks.length});
            }).catch(error => {
            console.log(error.response)
        })

    }

    render(): JSX.Element {


        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <h1>Add Book</h1>
                <Paper className={this.props.classes.root}  >
                    <form onSubmit={e => this.handleAddBookSubmit(e)}
                          className={this.props.classes.container}>
                        <Row className={this.props.classes.row}>
                            <TextField required={true} value={this.state.book_isbn}
                                       label={"ISBN:"}
                                       className={this.props.classes.textField}
                                       helperText={"Enter 13 characters"}
                                       variant="outlined"
                                       onChange={e => this.setState({book_isbn: e.target.value})}
                                       type="text"/>
                        </Row>
                        <Row className={this.props.classes.row}>

                            <TextField required={true} value={this.state.book_title}
                                       label={"Book Title"}
                                       className={this.props.classes.textField}
                                       variant="outlined"
                                       onChange={e => this.setState({book_title: e.target.value})}
                                       type="text"/>
                        </Row>
                        <Row className={this.props.classes.row}>
                            <TextField required={true} value={this.state.book_genre}
                                       onChange={e => this.setState({book_genre: e.target.value})}
                                       className={this.props.classes.textField}
                                       label={"Genre"}
                                       variant="outlined"
                                       type="text"/>
                        </Row>
                        <Row className={this.props.classes.row}>
                            <TextField required={true} value={this.state.publisher}
                                       onChange={e => this.setState({publisher: e.target.value})}
                                       className={this.props.classes.textField}
                                       label={"Publisher"}
                                       variant="outlined"
                                       type="text"/>
                        </Row>
                        <Row className={this.props.classes.row}>
                            <TextField required={true} value={this.state.number_of_pages}
                                       onChange={e => this.setState({number_of_pages: e.target.value})}
                                       className={this.props.classes.textField}
                                       label={"Number of pages"}
                                       helperText={"A book has to have more than 5 pages"}
                                       variant="outlined"
                                       type="number"/>
                        </Row>

                        <Row className={this.props.classes.row}>
                            <Row>
                                <InputLabel htmlFor="date">Date Published</InputLabel>
                            </Row>
                            <TextField
                                required={true}
                                id="date"
                                type="date"
                                variant="outlined"
                                value={this.state.book_publishedDate}
                                className={this.props.classes.textField}
                                onChange={e => this.setState({book_publishedDate: e.target.value})}

                            />
                        </Row>
                        <Row className={this.props.classes.row}>
                            <TextField
                                required={true}
                                onChange={(e) => this.setState({first_author: e.target.value})}
                                value={this.state.first_author}
                                variant="outlined"
                                className={this.props.classes.authorField}
                                label={'Author ' + (this.firstAuthorName())}
                                type="text"
                            />
                            <RealButton color="primary" onClick={(e) => this.addAuthor(e)}
                                        className={this.props.classes.button}>Add Author</RealButton>
                        </Row>

                        {
                            this.state.book_authors.map((author, index) => {
                                // @ts-ignore
                                return (
                                    <Row className={this.props.classes.row} key={index}>
                                        <TextField
                                            onChange={(e) => this.handleAuthorFieldChange(e, index)}
                                            required={true}
                                            value={author}
                                            variant="outlined"
                                            className={this.props.classes.textField}
                                            label={'Author ' + (index + 2)}
                                            type="text"
                                        />
                                        <Button onClick={() => this.handleRemoveAuthorField(index)} variant="contained"
                                                color="primary">Remove</Button>
                                    </Row>
                                )
                            })
                        }


                        <Row className={this.props.classes.row}>

                            <RealButton bsStyle="primary" type="submit" value="Add Book">Add Book
                            </RealButton>

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
                        <Modal
                            show={this.state.show}
                            onHide={this.handleHide}
                            container={this}
                            aria-labelledby="contained-modal-title">
                            <Modal.Header closeButton={true}>
                                <Modal.Title id="contained-modal-title">
                                    Cannot Add Book
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Book Count exceeded Please.{'\n'}Delete a Book from the library to continue
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.handleHide}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                    </form>
                </Paper>
            </div>
        )
    }


}


export default withStyles(styles)(AddBook);