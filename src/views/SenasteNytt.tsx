import { useEffect, useState } from "react";
import { Article } from "../Types/types";
import { ArticleView } from "./ArticleView";
import { ShowAds } from "./Ads";
import InfiniteScroll from "react-infinite-scroller";
import "dayjs/locale/sv";
import { testURL } from "../assets/globalVariables";


// Definierar en funktionskomponent som heter HomeView
export const SenasteNytt = () => {
  // Initierar en state-variabel som heter "articles" med en tom array
  const [articles, setArticles] = useState<any[]>([]);
  const [fetches, setFetches] = useState(1);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  // Definierar en asynkron funktion som heter "getData" för att hämta alla artiklar
  const getData = async () => {
    // Skickar en GET-begäran till servern för att hämta alla artiklar
    const response = await fetch(`${testURL}/articles/${fetches}`);

    // Parsar svaret som JSON
    const data = (await response.json()) as Article;

    if (data.data.length > 0) {
      const arts = [...articles, ...data.data];
      setArticles(arts);
      setFetches(fetches + 1);
    } else {
      setHasMoreArticles(false);
    }
  };
 
 
  // Använder useEffect-hook:en för att anropa funktionen "getData" endast en gång när komponenten monteras
  useEffect(() => {
    getData();
  }, []);

  // Renderar komponenten
  return (
    <div className="">
      <InfiniteScroll
        pageStart={0}
        loadMore={getData}
        hasMore={hasMoreArticles}
        loader={<div className="border" key={0}></div>}
      >
        <div className=" bg-slate-100 gap-x-1.5 md:p-4 md:gap-x-3 grid grid-cols-11 min-h-[100vh]">
          <div className="mx-auto col-start-0 col-span-11 sm:mx-auto container sm:col-start-1 sm:col-span-9 lg:col-start-4 lg:col-span-4 ">
            {/* Loopar igenom varje artikel i "articles" och skapar en länk för varje artikel */}
            {articles.map((article) => (
              <ArticleView article={article} key={article.id} />
            ))}
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
