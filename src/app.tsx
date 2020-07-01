import React from 'react';
import {render} from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';


import * as paths from './utils/paths';


export const App = () => {
    return (
            <Router>
                <Switch>
                    <Route exact path="/">

                    </Route>
                    <Route exact path={paths.register}>

                    </Route>
                </Switch>
            </Router>
    )
}

render(<App />, document.getElementById('app-root'));
