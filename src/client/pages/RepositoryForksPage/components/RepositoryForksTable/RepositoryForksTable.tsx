import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';

import { useRepositoryForksSelector } from 'client/store/features';
import { useQueryParamsContext } from 'client/components';
import { TRepositoryForksPageQueryParams } from 'client/pages/RepositoryForksPage/';

import { RepositoryForksTableRow } from './units';
import { useRepositoryForksTablePagination } from './hooks';

export const RepositoryForksTable = () => {
  const [
    { page, take },
  ] = useQueryParamsContext<TRepositoryForksPageQueryParams>();
  const { data, totalCount, isError } = useRepositoryForksSelector();
  const {
    onChangePage,
    onChangeRowsPerPage,
  } = useRepositoryForksTablePagination();

  if (isError)
    return (
      <Box width={1}>
        <Typography variant="h4" align="center">
          Not Found
        </Typography>
      </Box>
    );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repository name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Stargazers</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, full_name, owner, stargazers_count }) => (
            <RepositoryForksTableRow
              key={id}
              {...{ owner }}
              fullName={full_name}
              stargazersCount={stargazers_count}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={totalCount}
              page={page}
              rowsPerPageOptions={[10, 25]}
              rowsPerPage={take}
              {...{ onChangePage, onChangeRowsPerPage }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
