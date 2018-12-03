import * as React from 'react';
import {IconButton, Input, MenuItem, Paper, Select, Snackbar, TextField, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import DVD from "../library-items/DVD";
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

export class ReturnDVD extends React.PureComponent<WithStyles<typeof styles>, IReturnDVD> {
    constructor(props) {
        super(props);
        this.state = {
            DVD_isbn: "",
            reader_id: "",
            DVDs: [],
            readers: [{readerID: "", readerName: "", mobileNumber: "", email: "email"}],
            date_returned: "",
            time_returned: "",
            availableDVDs: [],
            response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},
            open: false,
        }
    }


    componentWillMount() {
        axios.get('http://localhost:9000/api/getDVD')
            .then(res => {
                const retrievedDVDs = res.data;
                this.setState({DVDs: retrievedDVDs});
                this.state.DVDs.forEach(value => {
                    if (value.borrowed) {
                        this.state.availableDVDs.push(value)
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

    handleBorrowDVDSubmit(e) {
        e.preventDefault();
        this.setState({open: true});
        const returnDetails = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    isbn: this.state.DVD_isbn,
                    returned_date: this.state.date_returned,
                    time: this.state.time_returned
                }
            };

            axios.post('http://localhost:9000/api/returnDVD', returnDetails)
                .then(res => {

                    console.log(res);
                    this.setState({response: res});

                }).catch(error => {
                console.log(error.response);
                this.setState({response: error.response});

            });
            this.setState({
                DVD_isbn: "",
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
                <h1>Return DVD</h1>
                <Paper className={this.props.classes.root}>
                    <form onSubmit={e => this.handleBorrowDVDSubmit(e)}>
                        <Row className={classes.row}>
                            <Row>
                                <InputLabel htmlFor={"dvd-tag"}>
                                    Select DVD
                                </InputLabel>
                            </Row>
                            <Select required={true}
                                    input={<Input name="dvd" id="dvd-tag"/>}
                                    inputProps={{name: "DVDs"}}
                                    value={this.state.DVD_isbn}
                                    onChange={e => this.setState({DVD_isbn: e.target.value})} name={"select"}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.state.availableDVDs.map(dvd =>

                                    <MenuItem value={dvd.isbn} key={dvd.isbn}>{dvd.isbn} | {dvd.title}</MenuItem>
                                )}
                            </Select>
                        </Row>

                        <Row className={classes.row}>

                            <InputLabel>
                                Select Return Date
                            </InputLabel>
                            <TextField
                                required={true}
                                type="date"
                                defaultValue=""
                                className={classes.textField}
                                onChange={e => this.setState({date_returned: e.target.value})}
                            />
                            <InputLabel>
                                Select Return Time
                            </InputLabel>
                            <TextField
                                required={true}
                                type="time"
                                className={classes.textField}
                                onChange={event => this.setState({time_returned: event.target.value})}
                            />
                        </Row>
                        <Row className={classes.row}>

                            <Button color="primary" variant="contained" type="submit" className={classes.button}>Borrow
                                DVD</Button>
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
                </Paper>
            </div>
        );
    }
}


interface IReturnDVD {
    DVD_isbn: string;
    reader_id: string;
    DVDs: DVD[];
    availableDVDs: DVD[]
    readers: any
    date_returned: string;
    time_returned: string;
    response:any;
    open:boolean;
}

export default withStyles(styles)(ReturnDVD);