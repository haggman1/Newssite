import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import { Article } from "../Types/types";
import { ShowAds } from "./Ads";
import { ArticleView } from "./ArticleView";
import { testURL } from "../assets/globalVariables";


export const ViewCategories = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { id } = useParams();
  const [fetches, setFetches] = useState(1);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  const getData = async () => {
    const response = await fetch(`${testURL}/kategori/${id}/${fetches}`);
    const data = (await response.json()) as Article;
    
    if (data.data.length > 0) {
      const arts = [...articles, ...data.data];
      setArticles(arts);
      setFetches(fetches + 1);
    } else {
      setHasMoreArticles(false);
    }
  }

  useEffect(() => {
    setHasMoreArticles(true)
    setFetches(1)
    setArticles([])
    getData();
  }, [id]);

  return (
    <div className="">
      <InfiniteScroll
        pageStart={0}
        loadMore={getData}
        hasMore={hasMoreArticles}
        loader={<div className="border" key={0}></div>}
      >
        <div className=" bg-slate-100 gap-x-1.5 md:p-4 md:gap-x-3 grid grid-cols-11 min-h-[100vh]">
          <div className="mx-auto col-start-0 col-span-11 sm:mx-auto container sm:col-start-1 sm:col-span-9 lg:col-start-4 lg:col-span-4">
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
