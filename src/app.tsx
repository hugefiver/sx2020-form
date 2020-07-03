import React from 'react';
import {render} from 'react-dom';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider, ThemeProvider} from '@material-ui/core';
import 'fontsource-roboto';

import * as paths from './utils/paths';

import Index from './pages';
import Register from './pages/register';
import Login from './pages/login';

export const App = () => {
    const theme = createMuiTheme({
        typography: {
            fontFamily: ' "PingFang SC", "Noto Sans", "Microsoft YaHei",' +
                ' "Roboto", "Helvetica", "Arial", "sans-serif" ',
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Index />
                    </Route>
                    <Route exact path={paths.register}>
                        <Register />
                    </Route>
                    <Route exact path={paths.login}>
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>

    )
}

render(<App />, document.getElementById('app-root'));
