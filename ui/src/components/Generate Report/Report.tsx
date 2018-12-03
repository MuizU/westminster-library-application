import * as React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import axios from 'axios';
import * as _ from 'lodash';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '95%',
            marginTop: theme.spacing.unit * 6,
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit * 6,

            overflowX: 'auto',

        },
        table: {},
        tableRow: {
            fontSize: 13,
        }
    });

export class Report extends React.PureComponent<IProps, IReport> {
    state: IReport = {
        report_documents: [{
            name: "", title: "", amountDue: "",
            dateReturned: {
                date: "", month: "",
                hour: "", year: "", day: "", minute: ""
            }, itemType: ""
        }],
        isbn: "",
        title: "",
        amount: "",
        item_type: ""
    };

    componentWillMount(): void {
        axios.get('http://localhost:9000/api/getReport').then(res => {
            const retrievedReaders = res.data;
            this.setState({report_documents: retrievedReaders});
            if (this.state.report_documents.length> 0) {

                const documents = _.orderBy(this.state.report_documents, [parseInt('amountDue', 10)], ['desc']);
                this.setState({report_documents: documents});
            }
        }).catch(error => {
            console.log(error.response)
        });

    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <h1>Overdue Expense Report</h1>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={this.props.classes.tableRow}>Title</TableCell>
                                <TableCell className={this.props.classes.tableRow}>ISBN</TableCell>
                                <TableCell className={this.props.classes.tableRow}>Amount Due</TableCell>
                                <TableCell className={this.props.classes.tableRow}>Item Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.report_documents.map(report => {
                                return (
                                    <TableRow className={this.props.classes.tableRow}
                                              key={report.dateReturned + report.isbn}>
                                        <TableCell className={this.props.classes.tableRow}> {report.title}</TableCell>
                                        <TableCell className={this.props.classes.tableRow}>{report.isbn}</TableCell>
                                        <TableCell
                                            className={this.props.classes.tableRow}>£ {report.amountDue}</TableCell>
                                        <TableCell className={this.props.classes.tableRow}>{report.itemType}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

        );
    }
}

interface IReport {
    report_documents: [any];
    isbn: string;
    title: string;
    amount: string;
    item_type: string;

}

// @ts-ignore
interface IProps extends WithStyles<typeof styles> {

}

export default withStyles(styles)(Report)
