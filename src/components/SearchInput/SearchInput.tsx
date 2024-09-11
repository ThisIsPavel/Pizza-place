import { SearchInputProps } from "./SearchInput.props";
import styles from "./SearchInput.module.css";

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <div className={styles.wrapper}>
      <img src="./search.svg" alt="Иконка поиска" className={styles.img} />
      <input {...props} className={styles.input} />
    </div>
  );
};

export default SearchInput;
