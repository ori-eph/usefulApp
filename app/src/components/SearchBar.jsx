import { useRef, useState } from "react";

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const searchParm = useRef("");

  function getSearchResults() {}

  return (
    <div>
      <select ref={searchParm}>
        <option value="q">auto</option>
        {props.searchBy?.map((searchParm) => {
          return (
            <option value={searchParm} key={searchParm}>
              {searchParm}
            </option>
          );
        })}
      </select>
      <input
        type="search"
        placeholder="search..."
        name="search"
        id="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={getSearchResults()}>search</button>
    </div>
  );
}

export default SearchBar;
