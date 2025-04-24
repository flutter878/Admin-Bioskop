import styles from './search.module.css';
import { MdSearch } from 'react-icons/md';

const SearchBar = ({placeholder}) => {
  return (
    <div className={styles.container}>
      <MdSearch className={styles.icon} />
      <input
        type="text"
        placeholder="Cari..."
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
