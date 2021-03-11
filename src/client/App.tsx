import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { store } from './store';
import { RepositoryForksPage, SearchPage } from './pages';
import { GlobalStyle } from './App.styled';

const theme = createMuiTheme();

export const App = () => {
  return (
    <BrowserRouter>
      <Provider {...{ store }}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route
                path="/repos/:owner/:repository/forks"
                component={RepositoryForksPage}
              />
            </Switch>
          </MuiThemeProvider>
        </StylesProvider>
      </Provider>
    </BrowserRouter>
  );
};
