import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import { testURL } from "../assets/globalVariables";
import { Article } from "../Types/types";
import { ShowAds } from "./Ads";
import { ArticleView } from "./ArticleView";

export const ViewSearch = () => {
  const [articles, setArticles] = useState<any[]>([]); // En state-variabel för artiklar, med initialt värde av en tom array. setArticles är en funktion som används för att uppdatera värdet på state-variabeln.
  const { keyword } = useParams(); // Hämtar keyword-parameter från URL:en med hjälp av useParams-hooken.
  const [fetches, setFetches] = useState(1);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  const getData = async () => {
    // En asynkron funktion som hämtar data från en API-endpoint.

    const response = await fetch(`${testURL}/search/${keyword}/${fetches}`); // Använder fetch API:et för att skicka en GET-request till en specifik URL.
    const data = await response.json(); // Parsar svaret som JSON och lagrar det i en variabel.
    // setArticles(data.data); // Uppdaterar state-variabeln för artiklar med datan från API:et.

    if (data.data.length > 0) {
      const arts = [...articles, ...data.data];
      setArticles(arts);
      setFetches(fetches + 1);
    } else {
      setHasMoreArticles(false);
    }
    
  };

  useEffect(() => {
    // Använder useEffect-hooken för att anropa getData-funktionen en gång när komponenten laddas.
    setArticles([]);
    setFetches(1);
    setHasMoreArticles(true);
    getData();
  }, [keyword]);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={getData}
        hasMore={hasMoreArticles}
        loader={<div className="border" key={0}></div>}
      >
        <div className="bg-slate-100 gap-x-1.5 md:p-4 md:gap-x-3 grid grid-cols-11 min-h-[100vh]">
          <div className="mx-auto col-start-0 col-span-11 sm:mx-auto container sm:col-start-1 sm:col-span-9 lg:col-start-4 lg:col-span-4">
            {articles.length === 0 ? (
              <div className="font-serif text-lg text-center sm:font-serif sm:text-lg sm:text-center">
                Ingen artikel hittad.
              </div>
            ) : (
              articles.map((article: Article) => (
                <ArticleView article={article} key={article.id} />
              ))
            )}
          </div>
          <div className="hidden sm:col-start-10 md:col-span-2 md:block">
            <ShowAds />
          </div>
        </div>
      </InfiniteScroll>
      <div className="flex flex-wrap sm:hidden ">
        <ShowAds direction="row" />
      </div>
    </div>
  );
};
