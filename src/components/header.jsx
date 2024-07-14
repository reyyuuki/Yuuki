import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSnowflake,
  faShuffle,
  faSun,
  faMoon,
  faUser,
  faXmark,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { FetchBySearch } from "./apiFetch";

const Header = () => {
  const [Icon, setIcon] = useState(faSun);
  const [closeIcon, setCloseIcon] = useState(faSnowflake);
  const [name, setName] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", "dark");
    const SearchAnime = async () => {
      const response = await FetchBySearch(name);
      setAnimeList(response);
      console.log(response);
    };
    SearchAnime();
  }, [name]);

  const toggleTheme = () => {
    const Theme = document.body.getAttribute("data-theme");
    const newTheme = Theme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    setIcon(newTheme === "light" ? faMoon : faSun);
  };

  const Focused = () => {
    setFocused(true);
    setCloseIcon(faXmark);
  };
  const UnFocsed = () => {
    setFocused(false);
    setCloseIcon(faSnowflake);
  }

  return (
    <div className="header">
      <h1 className="Heading">YurAni </h1>
      <div className="box1">
        <div className="SearchContainer">
          <div className="SearchBox">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
            <input
              type="text"
              placeholder="Search Anime"
              className="Search"
              onClick={() => Focused()}
              onChange={handleSearch}
            />
            <FontAwesomeIcon icon={closeIcon} onClick={() => UnFocsed()} className="SnowIcon" />
          </div>
          <div className={focused ? "SearchList" : ""}>
            {animeList &&
              animeList.map((item, index) =>
                focused ? (
                  <a
                    href={`/details/${item.id}`}
                    key={index}
                    className="SearchItem"
                  >
                    <img src={item.image} alt="" className="SearchItemImage" />
                    <div className="SearchItemInfo">
                      <h4>
                        {(item.title.english || item.title.romaji).length > 30
                          ? (item.title.english || item.title.romaji).substring(
                              0,
                              27
                            ) + "..."
                          : item.title.english || item.title.romaji}
                      </h4>
                      <div className="Item-AnimeIcons">
                        <div className="Search-ItemDiv">
                          <ion-icon name="tv-outline"></ion-icon>
                          {item.type || "??"}
                        </div>
                        <div className="Search-ItemDiv">
                          <ion-icon name="calendar-outline"></ion-icon>
                          {item.releaseDate || "??"}
                        </div>
                        <div className="Search-ItemDiv">
                      <ion-icon name="star"></ion-icon>
                      {item.rating / 10 || "??"}
                    </div>
                      </div>
                    </div>
                  </a>
                ) : null
              )}
          </div>
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faShuffle} />
        </div>
      </div>
      <div className="box2">
        <div className="icons" onClick={() => toggleTheme()}>
          <FontAwesomeIcon icon={Icon} />
        </div>
        <div className="icons">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </div>
  );
};

export default Header;
