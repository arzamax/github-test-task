import { useHistory } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';

import { useStyles } from './SearchPage.styled';

const isSearchStringValid = (str: string) => {
  const result = str.split('/');
  return result.length === 2 && result[0].length > 1 && result[1].length > 1;
};

export const SearchPage = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [isSearchError, setSearchError] = useState(false);
  const classes = useStyles();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleBlurSearch = () => {
    setSearchError(!isSearchStringValid(search));
  };

  const handleClickSearch = () => {
    if (!isSearchError) {
      history.push(`/repos/${search}/forks`);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h3" align="center">
        Enter owner and repository
      </Typography>
      <Box display="flex" alignItems="flex-start" width={1} mt={2}>
        <TextField
          helperText={
            isSearchError
              ? 'Invalid search string'
              : 'Example: "facebook/react"'
          }
          error={isSearchError}
          onChange={handleChangeSearch}
          onBlur={handleBlurSearch}
          className={classes.search}
        />
        <Button variant="contained" color="primary" onClick={handleClickSearch}>
          Search
        </Button>
      </Box>
    </Container>
  );
};
