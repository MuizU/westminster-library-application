import * as React from 'react';
import DVD from "../library-items/DVD";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import {
    Paper,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '95%',
            marginTop: theme.spacing.unit * 6,
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 6,


        }

    });

class DisplayDVDs extends React.PureComponent<WithStyles<typeof styles>, IDisplayDVDs> {
    state: IDisplayDVDs = {
        DVDs: []
    };

    componentWillMount(): any {
        axios.get('http://localhost:9000/api/getDVD')
            .then(res => {
                const retrievedBooks = res.data;
                this.setState({DVDs: retrievedBooks});

            }).catch(error => {
            console.log(error.response)
        })

    }

    rowStyleFormat(row, rowIdx) {
        return {backgroundColor: row.borrowed ? '#F08080' : '#c8e6c9'};
    }

    render() {
        const columns = [{
            dataField: 'isbn',
            text: 'DVD ISBN'
        }, {
            dataField: 'title',
            text: 'DVD Title'

        },
            {
                dataField: 'borrowed',
                text: "Book Borrowed"
            }
        ];
        const {SearchBar} = Search;

        return (
            <div>
                <link rel="stylesheet"
                      href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.css"/>
                <h1>Display DVDs</h1>
                <Paper className={this.props.classes.root}>
                    <ToolkitProvider
                        keyField="id"
                        data={this.state.DVDs}
                        columns={columns}
                        search={true}
                    >
                        {
                            props => (
                                <div>
                                    <SearchBar  {...props.searchProps} />
                                    <hr/>
                                    <BootstrapTable rowStyle={this.rowStyleFormat}
                                                    {...props.baseProps}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Paper>
            </div>
        );
    }
}

interface IDisplayDVDs {
    DVDs: DVD[];

}

export default withStyles(styles)(DisplayDVDs);