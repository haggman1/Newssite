import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { testURL } from "../assets/globalVariables";
import { Article } from "../Types/types";
import { ShowAds } from "./Ads";
import { ArticleView } from "./ArticleView";
import CookieConsent from "react-cookie-consent";

export const ToppNyheter = () => {

const [topNews, setTopNews] = useState<Article[]>([]);
const [fetches, setFetches] = useState(1);
const [hasMoreArticles, setHasMoreArticles] = useState(true);

const getData = async () => {
    
    const response = await fetch(`${testURL}/toppnyhet/${fetches}`);
    const data = (await response.json()) as Article;
    
    if (data.data.length > 0) {
        const arts = [...topNews, ...data.data];
        setTopNews(arts);
        setFetches(fetches + 1);
      } else {
        setHasMoreArticles(false);
      }
    
}
useEffect(() => {
    getData();
    
}, [])

    return( 
        <div className="">
        <InfiniteScroll
          pageStart={0}
          loadMore={getData}
          hasMore={hasMoreArticles}
          loader={<div className="border" key={0}></div>}
          >
        <div className=" bg-slate-100 gap-x-1.5 md:p-4 md:gap-x-3 grid grid-cols-11 min-h-[100vh]">
            <div className="mx-auto col-start-0 col-span-11 sm:mx-auto container sm:col-start-1 sm:col-span-9 lg:col-start-4 lg:col-span-4">
           {topNews.map((topnews) => (
            <ArticleView article={topnews} key={topnews.id} />
          ))}
          </div>
          <div className="hidden sm:col-start-10 md:col-span-2 md:block"><ShowAds /></div>
        </div>
        </InfiniteScroll>
        <div className="flex flex-wrap sm:hidden ">
        <ShowAds direction="row" />
      </div>
          <CookieConsent
          debug={true} 
          location="bottom"
          style={{ backgroundColor:"lightgray", color:"black", textAlign:"center"}}
          buttonStyle={{color:"black", backgroundColor:"white" }}
          buttonText="Jag förstår"
          expires={7}
          
          >Vi sparar data i cookies, genom att använda våra tjänster godkänner du det. Läs <a href="/privacy" style={{color:"blue"}} >privacy policy</a> för mer info.
          </CookieConsent>
        </div>
    )       
}