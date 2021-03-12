import { Avatar, Box, TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { TRepositoryOwner } from 'client/store/features';

import { useStyles } from './RepositoryForksTableRow.styled';

type TRepositoryForksTableRow = {
  fullName: string;
  owner: TRepositoryOwner;
  stargazersCount: number;
};

export const RepositoryForksTableRow = ({
  fullName,
  owner,
  stargazersCount,
}: TRepositoryForksTableRow) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Avatar src={owner.avatar_url} className={classes.avatar} />
          <Link to={`/repos/${fullName}/forks`}>{fullName}</Link>
        </Box>
      </TableCell>
      <TableCell>{owner.login}</TableCell>
      <TableCell>{stargazersCount}</TableCell>
    </TableRow>
  );
};
