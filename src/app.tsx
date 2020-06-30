import React from 'react';
import { render } from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';

import { Index } from "./pages";

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Index />
                </Route>
            </Switch>
        </Router>
    )
}

render(<App/>, document.getElementById('app-root'));