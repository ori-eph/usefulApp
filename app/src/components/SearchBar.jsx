import { useEffect, useRef, useState } from "react";

function SearchBar(props) {
  const [search, setSearch] = useState("");
  const searchParm = useRef("auto");
  const ogList = useRef(props.list);

  useEffect(() => {
    if (!ogList.current.length) {
      ogList.current = props.list;
    }
  }, [props.list]);

  function getSearchResults() {
    props.setErr(null);

    if (!search) {
      props.setList(ogList.current);
    } else {
      let result = [];
      if (searchParm.current.value === "auto") {
        result = ogList.current.filter((item) => {
          for (const value of Object.values(item)) {
            if (value.toString().toLowerCase().includes(search.toLowerCase())) {
              return true;
            }
          }
          return false;
        });
      } else {
        result = ogList.current.filter((item) => {
          console.log(
            item[searchParm.current.value]
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          );
          return item[searchParm.current.value]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase());
        });
      }
      if (result.length > 0) {
        props.setList(result);
      } else {
        props.setList([]);
        props.setErr(Error("no matching results."));
      }
    }
  }

  return (
    <div>
      <select ref={searchParm}>
        <option value="auto">auto</option>
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
      <button onClick={getSearchResults}>search</button>
    </div>
  );
}

export default SearchBar;
