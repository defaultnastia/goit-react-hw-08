import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const searchFieldId = useId();

  return (
    <div className={css.searchBox}>
      <label htmlFor={searchFieldId}>Filter Contacts by Name</label>
      <input
        onChange={(event) => dispatch(changeFilter(event.target.value))}
        type="text"
        name="searchbox"
        id={searchFieldId}
        defaultValue={filter}
        placeholder="Start typing name"
      />
    </div>
  );
};

export default SearchBox;
