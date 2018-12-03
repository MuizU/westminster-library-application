import * as React from 'react';
import {IconButton, MenuItem, Paper, Snackbar, TextField, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import DVD from "../library-items/DVD";
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
            alignItems: 'center',

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

export class BorrowDVD extends React.PureComponent<WithStyles<typeof styles>, IBorrowDVD> {
    constructor(props) {
        super(props);
        this.state = {
            DVD_isbn: "",
            reader_id: "",
            DVDs: [],
            readers: [{readerID: "", readerName: "", mobileNumber: "", email: "email"}],
            date_borrowed: "",
            time_borrowed: "",
            borrowedDVDs: [],
            response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},

            open: false,
        }
    }

    handleClose = () => {

        this.setState({open: false});
    };

    componentWillMount() {
        axios.get('http://localhost:9000/api/getDVD', {headers: {"Access-Control-Allow-Origin": "*"}})
            .then(res => {
                const retrievedDVDs = res.data;
                this.setState({DVDs: retrievedDVDs});
                this.state.DVDs.forEach(value => {
                    if (!value.borrowed) {
                        this.state.borrowedDVDs.push(value)
                    }
                });
            }).catch(error => {
            console.log(error.response)
        });
        this.state.readers.map(reader => {
            console.log(reader.readerName)
        });
        axios.get('http://localhost:9000/api/getReader', {headers: {"Access-Control-Allow-Origin": "*"}})
            .then(res => {
                const retrievedReaders = res.data;
                this.setState({readers: retrievedReaders});

            }).catch(error => {
            console.log(error.response)
        })
    }

    handleBorrowDVDSubmit(e) {
        e.preventDefault();
        const borrowDetails = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                isbn: this.state.DVD_isbn,
                id: this.state.reader_id,
                date: this.state.date_borrowed,
                time: this.state.time_borrowed
            }
        };

        axios.post('http://localhost:9000/api/BorrowDVD', borrowDetails)
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(error => {
            console.log(error.response)
        });
        this.setState({
            DVD_isbn: "",
            reader_id: "",
            date_borrowed: "",
            time_borrowed: "",
        })
    }


    render() {
        const classes = this.props.classes;
        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <h1>Borrow DVD</h1>
                <Paper className={this.props.classes.root}>
                    <form onSubmit={e => this.handleBorrowDVDSubmit(e)}>
                        <Row className={classes.row}>
                            <Row>
                                <InputLabel>
                                    Select DVD
                                </InputLabel>
                            </Row>
                            <TextField required={true} select={true} inputProps={{name: "DVDs"}}
                                       value={this.state.DVD_isbn}
                                       onChange={e => this.setState({DVD_isbn: e.target.value})} name={"select"}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.borrowedDVDs.map(dvd =>

                                    <MenuItem value={dvd.isbn} key={dvd.isbn}>{dvd.isbn} | {dvd.title}</MenuItem>
                                )}
                            </TextField>
                        </Row>
                        <Row className={classes.row}>
                            <Row>
                                <InputLabel>
                                    Select Reader
                                </InputLabel>
                            </Row>
                            <TextField required={true} select={true} inputProps={{name: "readers"}}
                                       value={this.state.reader_id}
                                       onChange={e => this.setState({reader_id: e.target.value})} name={"select"}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.readers.map(reader =>
                                    <MenuItem value={reader.readerID}
                                              key={reader.readerID}>{reader.readerID} | {reader.readerName}</MenuItem>
                                )}
                            </TextField>
                        </Row>
                        <Row className={classes.row}>
                            <TextField
                                required={true}
                                label="Date Borrowed"
                                type="date"
                                value={this.state.date_borrowed}
                                className={classes.textField}
                                onChange={e => this.setState({date_borrowed: e.target.value})}
                            />
                            <TextField
                                required={true}
                                label="Time Borrowed"
                                type="time"
                                value={this.state.time_borrowed}
                                className={classes.textField}
                                inputProps={{
                                    step: 300,
                                }}
                                onChange={event => this.setState({time_borrowed: event.target.value})}
                            />
                        </Row>
                        <Row className={classes.row}>

                            <Button color="primary" variant="contained" type="submit" className={classes.button}>Borrow
                                DVD</Button>
                        </Row>

                    </form>
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

                </Paper>

            </div>
        );
    }
}


interface IBorrowDVD {
    DVD_isbn: string;
    reader_id: string;
    DVDs: DVD[];
    borrowedDVDs: DVD[]
    readers: any
    date_borrowed: string;
    time_borrowed: string;
    response: any;
    open: boolean;
}

export default withStyles(styles)(BorrowDVD);