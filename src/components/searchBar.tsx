import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Article } from "../Types/types";
import { ArticleView } from "../views/ArticleView";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState<any>([]);
  const [filteredArticles, setFilteredArticles] = useState<any>([]);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const resetSearch = (e: any) => {
    setSearchInput("");
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
    }
  };

  return (
    <div className="flex pr-4 
    lg:pr-2">
      <div className="font-serif text-lg pr-2 ">
        <input
          className="hidden  sm:block sm:rounded-full sm:border sm:my-0.5 sm:w-36 sm:text-center"
          type="text"
          onChange={handleChange}
          onKeyUp={handleKeyPress}
          placeholder="Sök"
          value={searchInput}
        />
      </div>
      <div style={{ opacity: 0.3 }}>
        <NavLink className="text-4xl sm:text-3xl" to={`/search/${searchInput}`}>
          <FontAwesomeIcon
            onClick={resetSearch}
            icon={faMagnifyingGlass}
            size="sm"
          />
        </NavLink>

      </div>
      {filteredArticles.length > 0 ? (
        <div>
          {filteredArticles.map((article: Article) => (
            <ArticleView key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
