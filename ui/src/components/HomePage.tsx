import * as React from 'react';
import {Typography} from "@material-ui/core";
import Icon from "@material-ui/core/es/Icon/Icon";
export class HomePage extends React.PureComponent{
    render() {
        return (
            <div>
                <Icon>Welcome To The Westminster Library Manager</Icon>
                <Typography >Choose an action from the navigation bar to get started</Typography>
            </div>
        );
    }
}