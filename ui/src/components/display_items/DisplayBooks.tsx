import * as React from 'react'
import axios from "axios";
import Book from "../library-items/Book";
import {
    Paper,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';


const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '95%',
            marginTop: theme.spacing.unit * 6,
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 6,


        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,


        },
        table: {},
        tableRow: {
            fontSize: 13,
        },
        row: {
            marginTop: 50
        },


    });

class DisplayBooks extends React.PureComponent<WithStyles<typeof styles>, IsDisplayBooks> {
    state: IsDisplayBooks = {
        isbn: "",
        title: "",
        books: [],
        search: '',
        columnToSearch: "",
        searchArray: []
    };

    componentWillMount(): any {
        axios.get('http://localhost:9000/api/getBook')
            .then(res => {
                const retrievedBooks = res.data;
                this.setState({books: retrievedBooks});
                this.setState({searchArray: retrievedBooks})

            }).catch(error => {
            console.log(error.response)
        });

        this.setState({searchArray: this.state.books.slice()})
    }
     rowStyleFormat(row, rowIdx) {
        return { backgroundColor: row.borrowed  ? '#F08080' : '#c8e6c9' };
    }


    render() {
        const columns = [{
            dataField: 'isbn',
            text: 'Book ISBN'
        }, {
            dataField: 'title',
            text: 'Book Title'

        },
            {
                dataField: 'borrowed',
                text: "Book Borrowed"
            }
        ];





            const {SearchBar} = Search;
            return (
                <div>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                          crossOrigin="anonymous"/>
                    <h1>Display Books</h1>

                    <Paper className={this.props.classes.root}>
                        <ToolkitProvider
                            keyField="id"
                            data={this.state.books}
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

    interface IsDisplayBooks {
    isbn: string;
    title: string
    books: Book[];
    search: any;
    columnToSearch: any;
    searchArray: any;
}

export default withStyles(styles)(DisplayBooks);