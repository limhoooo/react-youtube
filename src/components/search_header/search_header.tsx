import styles from './search_header.module.css';
import React, { useRef, KeyboardEvent } from 'react';
import { memo, useEffect, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { getVideoSaerch, getChannelsList, videoActions, getVideoSaerchPreview } from '../../store/reducers/videoSlice';
import { unwrapResult } from '@reduxjs/toolkit';

interface Props {
  onLogoClickFnc: () => void;
}

const SearchHeader = memo(({ onLogoClickFnc }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchList = useAppSelector(video => video.video.searchList);
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
  // 디바운싱
  useEffect(() => {
    const indentifier = setTimeout(() => {
      if (search) {
        dispatch(getVideoSaerchPreview(search));
      } else {
        dispatch(videoActions.initSearchList());
      }
    }, 500);

    return () => {
      clearTimeout(indentifier);
    };
  }, [dispatch, search]);
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
          type="search"
          value={search}
          placeholder="Search..."
          onChange={onChangeSearch}
          onKeyPress={onKeyPress}
        />
        <button className={styles.button} type="submit" onClick={handleSearch}>
          <img className={styles.buttonImg} src="/images/search.png" alt="search" />
        </button>
        {searchList.length !== 0 && (
          <div className={styles.searchBoxPreview}>
            {searchList.map((item, index) => (
              <p key={index}>{item.snippet.title}</p>
            ))}
          </div>
        )}
        <div></div>
      </div>
    </header>
  );
});

export default SearchHeader;
