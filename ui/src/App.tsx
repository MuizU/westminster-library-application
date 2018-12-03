import * as React from 'react';
import './App.css';
import LibraryHeader from './components/default/LibraryHeader'
import 'node_modules/react-material-navbar/dist/all.css'
import LibraryNavbar from "./components/default/LibraryNavbar"

class App extends React.PureComponent {

componentDidMount(): void {
    document.title="Westminster Library Manager"
}

    render(): JSX.Element {
        return (
            <div className="App">

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>

                <LibraryHeader/>
                <LibraryNavbar/>

            </div>

        )
            ;


    }
}


export default App;

