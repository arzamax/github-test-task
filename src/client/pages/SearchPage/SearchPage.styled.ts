import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  search: {
    flex: '1 0 auto',
    marginRight: 10,
  },
});
