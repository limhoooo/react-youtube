import styles from './search_header.module.css';
import React, { useRef, KeyboardEvent } from 'react';
import { memo, useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { getVideoSaerch, getChannelsList, videoActions, getVideoSaerchPreview } from '../../store/reducers/videoSlice';

interface Props {
  onLogoClickFnc: () => void;
}

const SearchHeader = memo(({ onLogoClickFnc }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchList = useAppSelector(state => state.video.searchList);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const handleSearch = async () => {
    const response = await dispatch(getVideoSaerch(search)).unwrap();
    await dispatch(getChannelsList({ items: response, type: 'search' }));
    setSearch('');
    onLogoClick();
  };
  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') handleSearch();
  };
  const onLogoClick = () => {
    onLogoClickFnc();
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickPreview = (value: string) => {
    setSearch(value);
    handleSearch();
  };
  const getVideoSaerchPreviewFnc = useCallback(async () => {
    await dispatch(search ? getVideoSaerchPreview(search) : videoActions.initSearchList());
  }, [dispatch, search]);

  // 디바운싱 검색기능
  useEffect(() => {
    const indentifier = setTimeout(() => {
      getVideoSaerchPreviewFnc();
    }, 500);
    return () => {
      clearTimeout(indentifier);
    };
  }, [getVideoSaerchPreviewFnc]);
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onLogoClick}>
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Youtube</h1>
      </div>
      <div className={styles.searchBox}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={search}
          placeholder="Search..."
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
        />
        <button className={styles.button} type="submit" onClick={handleSearch}>
          <img className={styles.buttonImg} src="/images/search.png" alt="search" />
        </button>
        {searchList && searchList.length !== 0 && (
          <div className={styles.searchBoxPreviewBox}>
            {searchList.map((item, index) => (
              <div key={index} className={styles.searchBoxPreview} onClick={() => onClickPreview(item.snippet.title)}>
                <img className={styles.searchBoxPreviewIcon} src="/images/search.png" alt="search" />
                <div>
                  <p className={styles.searchTitle}>{item.snippet.title}</p>
                  <p className={styles.channelTitle}>{item.snippet.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
});

export default SearchHeader;
