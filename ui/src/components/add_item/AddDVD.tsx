import * as React from 'react';
import axios from "axios";
import {Button, Modal, Row} from "react-bootstrap";
import {IconButton, InputLabel, Paper, Snackbar, TextField, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
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

class AddDVD extends React.PureComponent<WithStyles<typeof styles>, IsDVDState> {
    constructor(props) {
        super(props);
        this.handleHide = this.handleHide.bind(this);
        this.state = {
            dvd_isbn: "",
            dvd_title: "",
            dvd_genre: "",
            dvd_producer_name: "",
            dvd_release_date: "",
            number_of_dvds_coll: 0,
            show: false,
            response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},
            open: false,


        }
    }

    componentWillMount(): void {
        axios.get('http://localhost:9000/api/getDVD')
            .then(res => {
                const retrievedDVDs = res.data;
                this.setState({number_of_dvds_coll: retrievedDVDs.length});
                console.log(this.state.number_of_dvds_coll)
            }).catch(error => {
            console.log(error.response)
        })

    }

    handleAddDVDSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (this.state.number_of_dvds_coll <= 50) {
            this.setState({open: true});

            const dvdItem = {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {

                    isbn: this.state.dvd_isbn,
                    title: this.state.dvd_title,
                    genre: this.state.dvd_genre,
                    producer_name: this.state.dvd_producer_name,

                }
            };
            axios.post('http://localhost:9000/api/DVD', dvdItem).then(res => {
                console.log(res.data);
                this.setState({response: res});

            }).catch(error => {
                console.log(error.response);
                this.setState({response: error.response});

            });
            this.setState({
                dvd_isbn: "",
                dvd_title: "",
                dvd_genre: "",
                dvd_producer_name: "",
                dvd_release_date: ""

            });
        } else {

        }
    }

    handleClose = () => {

        this.setState({open: false});
    };

    handleHide() {
        this.setState({show: false})
    }

    render(): JSX.Element {
        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <h1>Add DVD</h1>
                <Paper className={this.props.classes.root}>
                    <form onSubmit={e => this.handleAddDVDSubmit(e)} className={"App-li"} name={"dvd-form"}>
                        <Row className={this.props.classes.row}>

                            <TextField
                                label={"ISBN"}
                                required={true} value={this.state.dvd_isbn}
                                onChange={e => this.setState({dvd_isbn: e.target.value})}
                                type="text" name="dvd-isbn"/>

                        </Row>
                        <Row className={this.props.classes.row}>

                            <TextField
                                label={"Title"}
                                required={true} value={this.state.dvd_title}
                                onChange={e => this.setState({dvd_title: e.target.value})}
                                type="text" name="dvd-title"/>

                        </Row>
                        <Row className={this.props.classes.row}>

                            <TextField
                                label={"Genre"}
                                required={true} value={this.state.dvd_genre}
                                onChange={e => this.setState({dvd_genre: e.target.value})}
                                type="text" name="dvd-genre"/>
                        </Row>
                        <Row className={this.props.classes.row}>
                            <Row>
                                <InputLabel htmlFor="date">Date Published</InputLabel>
                            </Row>
                            <TextField
                                required={true}
                                id="date"
                                type="date"
                                value={this.state.dvd_release_date}
                                variant="outlined"
                                className={this.props.classes.textField}
                                onChange={e => this.setState({dvd_release_date: e.target.value})}

                            />
                        </Row>
                        <Row className={this.props.classes.row}>
                            <TextField
                                label={"Producer Name:"}
                                required={true} value={this.state.dvd_producer_name}
                                onChange={e => this.setState({dvd_producer_name: e.target.value})}
                                type="text" name="director"/>
                        </Row>
                        <Row className={this.props.classes.row}>

                            <Button bsStyle="primary" type="submit" value="Add DVD">Add DVD</Button>
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



                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton={true}>
                            <Modal.Title id="contained-modal-title">
                                DVD Limit Reached
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            DVD Count exceeded Please.{'\n'}Delete a DVD from the library to continue
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.handleHide()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Paper>
            </div>
        );
    }

}

interface IsDVDState {
    dvd_isbn: string;
    dvd_title: string;
    dvd_genre: string;
    dvd_producer_name: string;
    dvd_release_date: string
    number_of_dvds_coll: number;
    show: boolean;
    response: any
    open: boolean;
}

export default withStyles(styles)(AddDVD);