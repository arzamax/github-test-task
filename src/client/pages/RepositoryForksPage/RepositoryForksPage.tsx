import { Box, Container, Typography } from '@material-ui/core';

import { withQueryParams } from 'client/components';

import { RepositoryForksTable } from './components';
import { useRepositoryForksPage } from './hooks';
import { useStyles } from './RepositoryForksPage.styled';

export type TRepositoryForksPageParams = {
  owner: string;
  repository: string;
};

export type TRepositoryForksPageQueryParams = {
  page: number;
  take: number;
};

export const RepositoryForksPage = withQueryParams<TRepositoryForksPageQueryParams>(
  {
    defaultParams: {
      page: 0,
      take: 10,
    },
    paramsMapper: {
      page: Number,
      take: Number,
    },
  }
)(({ page, take }) => {
  const { owner, repository } = useRepositoryForksPage(page, take);
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h3" align="center">
        {owner}/{repository}
      </Typography>
      <Box width={1} mt={2}>
        <RepositoryForksTable />
      </Box>
    </Container>
  );
});
