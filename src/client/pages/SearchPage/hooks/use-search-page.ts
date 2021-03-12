import { useHistory } from 'react-router-dom';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

const isSearchStringValid = (str: string) => {
  const result = str.split('/');
  return result.length === 2 && result[0].length > 1 && result[1].length > 1;
};

export const useSearchPage = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [isSearchError, setSearchError] = useState(false);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onBlurSearch = () => {
    setSearchError(!isSearchStringValid(search));
  };

  const onClickSearchButton = () => {
    if (!isSearchError) {
      history.push(`/repos/${search}/forks`);
    }
  };

  const onKeyPressSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isSearchStringValid(search)) {
        history.push(`/repos/${search}/forks`);
      } else {
        setSearchError(true);
      }
    }
  };

  return {
    search,
    isSearchError,
    onChangeSearch,
    onBlurSearch,
    onClickSearchButton,
    onKeyPressSearch,
  };
};
