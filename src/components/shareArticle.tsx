import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { testURL } from "../assets/globalVariables";
import { Article } from "../Types/types";
import { ShowAds } from "../views/Ads";
import { ArticleView } from "../views/ArticleView";

export const ShareArticle = () => {
  const [article, setArticle] = useState<Article>();
  const { id } = useParams();

  const getData = async () => {
    // Skickar en GET-begäran till servern för att hämta alla artiklar
    const response = await fetch(`${testURL}/${id}`);
    // Parsar svaret som JSON
    const data = (await response.json()) as Article;
    
    setArticle(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-100 gap-x-1.5 md:p-4 md:gap-x-3 grid grid-cols-10 min-h-[100vh]">
      <div className="mx-auto container col-start-0 col-span-4 lg:col-start-4 lg:col-span-3">
        {/* Loopar igenom varje artikel i "articles" och skapar en länk för varje artikel */}
        {article === undefined ? (
        <div>Ingen artikel hittad.</div>
          ) : (
            <ArticleView article={article} key={article.id} />
        )}
      </div>
      <div className="col-start-7"><ShowAds /></div>
    </div>
  );
};

