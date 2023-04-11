import styles from './search_header.module.css';
import React, { useRef, KeyboardEvent } from 'react';
import { memo } from 'react';
import { useAppDispatch } from '../../hook/hooks';
import { getVideoSaerch } from '../../store/reducers/videoSlice';

interface Props {
  onLogoClickFnc: () => void;
}

const SearchHeader = memo(({ onLogoClickFnc }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleSearch = () => {
    const value = inputRef.current?.value as string;
    dispatch(getVideoSaerch(value));
    (inputRef.current as HTMLInputElement).value = '';
    onLogoClick();
  };
  const onClick = () => {
    handleSearch();
  };
  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') handleSearch();
  };
  const onLogoClick = () => {
    onLogoClickFnc();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onLogoClick}>
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Youtube</h1>
      </div>
      <input ref={inputRef} className={styles.input} type="search" placeholder="Search..." onKeyPress={onKeyPress} />
      <button className={styles.button} type="submit" onClick={onClick}>
        <img className={styles.buttonImg} src="/images/search.png" alt="search" />
      </button>
    </header>
  );
});

export default SearchHeader;
