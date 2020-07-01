import React from 'react';
import {render} from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {Customizer} from '@fluentui/react';
import {FluentCustomizations} from '@uifabric/fluent-theme/lib-commonjs';


import * as paths from './utils/paths';

import {Index} from './pages';
import Register from "./pages/register";

export const App = () => {
    return (
        <Customizer settings={FluentCustomizations.settings}
                    scopedSettings={FluentCustomizations.scopedSettings}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route exact path={paths.register}>
                        <Register />
                    </Route>
                </Switch>
            </Router>
        </Customizer>
    )
}

render(<App />, document.getElementById('app-root'));
