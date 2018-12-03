import * as React from 'react';
import {Button, IconButton, Paper, Snackbar, Theme, WithStyles} from "@material-ui/core";
import {Form, Row} from "react-bootstrap";
import TextField from "@material-ui/core/es/TextField/TextField";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

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

class CreateReader extends React.PureComponent<WithStyles<typeof styles>, ICreateReader> {
    state: ICreateReader = {
        reader_name: "",
        reader_mobile_number: "",
        reader_email: "",
        response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},

        open: false,

    };

    handleClose = () => {

        this.setState({open: false});
    };

    handleReaderSubmit(e): void {
        e.preventDefault();
        this.setState({open: true});

        const bookItem = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {

                name: this.state.reader_name,
                number: this.state.reader_mobile_number,
                email: this.state.reader_email,

            }

        };

        axios.post('http://localhost:9000/api/Reader', bookItem)
            .then(res => {
                console.log(res);
                this.setState({response: res});

            }).catch(error => {
            console.log(error.response);
            this.setState({response: error.response});

        });


        this.setState({
            reader_name: "",
            reader_mobile_number: "",
            reader_email: "",


        });

    }

    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <h1>Create Reader</h1>
                <Paper className={this.props.classes.root}>
                    <Form className={"CreateReader-Form"} onSubmit={(e) => this.handleReaderSubmit(e)}>
                        <Row>
                            <TextField
                                label={"Reader Name"}
                                className={this.props.classes.textField}
                                required={true}
                                value={this.state.reader_name}
                                variant="outlined"
                                onChange={e => this.setState({reader_name: e.target.value})}
                                type="text"
                            />
                        </Row>
                        <Row>
                            <TextField
                                label={"Reader Mobile Number"}
                                className={this.props.classes.textField}
                                required={true}
                                variant="outlined"
                                onChange={e => this.setState({reader_mobile_number: e.target.value})}
                                type="number"
                                value={this.state.reader_mobile_number}
                                autoComplete="email"
                                margin="normal"
                            />
                        </Row>
                        <Row>
                            <TextField
                                label={"Email"}
                                required={true}
                                className={this.props.classes.textField}
                                value={this.state.reader_email}
                                variant="outlined"
                                onChange={e => this.setState({reader_email: e.target.value})}
                                type="email"
                            />
                        </Row>
                        <Row>
                            <Button variant="contained" color="primary" type="submit"
                                    className={this.props.classes.button}>Add Reader</Button>

                        </Row>
                    </Form>
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

interface ICreateReader {
    reader_name: string;
    reader_mobile_number: string;
    reader_email: string;
    open: boolean;
    response:any;
}

export default withStyles(styles)(CreateReader);