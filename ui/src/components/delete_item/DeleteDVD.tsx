import * as React from 'react';
import axios from "axios"
import {Button,  Row} from "react-bootstrap";
import {IconButton, Paper, Select, Snackbar, Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import DVD from "../library-items/DVD";
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

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

class DeleteDVD extends React.PureComponent<WithStyles<typeof styles>, IDeleteBook> {
    constructor(props) {
        super(props);
        this.state = {
            DVDs: [],
            delete_dvd_isbn: "",
            response: {data: "", status: 0, statusText: "Bad Request", headers: {}, config: {}, request: ""},
            open: false,
        }

    }


    componentWillMount(): void {
        axios.get('http://localhost:9000/api/getDVD')
            .then(res => {
                const retrievedBooks = res.data;
                this.setState({DVDs: retrievedBooks});

            }).catch(error => {
            console.log(error.response)
        })

    }

    handleClose = () => {

        this.setState({open: false});
    };
    handleSubmit = event => {
        event.preventDefault();
        this.setState({open: true});
        const isbn = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                isbn: this.state.delete_dvd_isbn,
            }
        };
        axios.post('http://localhost:9000/api/DeleteDVD', isbn)
            .then(res => {

                console.log(res);

                this.setState({response: res.data});

            }).catch(error => {
            console.log(error.response.data);
            this.setState({response: error.response});

        });
    };

    render() {


        return (
            <div className={"DeleteDVD"}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <h1>Delete DVD</h1>
                <Paper className={this.props.classes.root}>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <Row className={this.props.classes.row}>
                            {/*Change this to a Select Tag with the ISBN as options*/}
                            <Select value={this.state.delete_dvd_isbn}
                                    onChange={e => this.setState({delete_dvd_isbn: e.target.value})} name={"select"}>
                                {this.state.DVDs.map(dvds =>
                                    <MenuItem value={dvds.isbn} key={dvds.isbn}>{dvds.isbn} - {dvds.title}</MenuItem>
                                )}
                            </Select>
                        </Row>
                        <Row className={this.props.classes.row}>

                            <Button type="submit">Delete Book</Button>
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

interface IDeleteBook {
    DVDs: DVD[];
    delete_dvd_isbn: string;
    response: any;
    open: boolean;
}

export default withStyles(styles)(DeleteDVD);