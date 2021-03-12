import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';

import { useSearchPage } from './hooks';
import { useStyles } from './SearchPage.styled';

export const SearchPage = () => {
  const {
    search,
    isSearchError,
    onChangeSearch,
    onBlurSearch,
    onKeyPressSearch,
    onClickSearchButton,
  } = useSearchPage();
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h3" align="center">
        Enter owner and repository
      </Typography>
      <Box display="flex" alignItems="flex-start" width={1} mt={2}>
        <TextField
          value={search}
          helperText={
            isSearchError
              ? 'Invalid search string'
              : 'Example: "facebook/react"'
          }
          error={isSearchError}
          onChange={onChangeSearch}
          onBlur={onBlurSearch}
          onKeyPress={onKeyPressSearch}
          className={classes.search}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onClickSearchButton}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
};
