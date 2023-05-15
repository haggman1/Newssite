import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Article } from "../Types/types";
import { ArticleView } from "../views/ArticleView";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "@headlessui/react";

export const MobileSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [articles, setArticles] = useState<any>([]);
  const [filteredArticles, setFilteredArticles] = useState<any>([]);
  const [displaySearch, setDisplaySearch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const toggleSearch = (e: any) => {
    setSearchInput("");
    setDisplaySearch(!displaySearch);
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchInput}`);
      setSearchInput("");
      setDisplaySearch(!displaySearch);
    }
  };

  return (
    <div className="flex pr-4 lg:pr-2">
      <Menu as="div">
        <Menu.Button className="text-4xl sm:text-3xl text-neutral-400">
          <FontAwesomeIcon
            onClick={toggleSearch}
            icon={faMagnifyingGlass}
            size="sm"
          />
        </Menu.Button>
        <Menu.Items>
          <div className="absolute left-0 rigth-0 bottom-0 transform translate-y-full w-full z-50 bg-white">
            <div className="font-serif text-lg justify-center divide-x-2 py-2 flex">
              <input
                className=" border w-full py-1 text-center"
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Sök"
                value={searchInput}
              />
              <NavLink
                className="bg-white px-2 text-slate-500 border pt-1"
                to={`/search/${searchInput}`}
              >
                <FontAwesomeIcon
                  onClick={toggleSearch}
                  icon={faMagnifyingGlass}
                  size="lg"
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
        </Menu.Items>
      </Menu>
    </div>
  );
};
