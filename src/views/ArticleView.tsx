// Importerar nödvändiga beroenden från React och React Router
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/sv";
import realtiveTime from "dayjs//plugin/relativeTime";
import { FacebookShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Article } from "../Types/types";
import { FC } from "react";
import { ShowAds } from "./Ads";
import { strapiURL, testURL } from "../assets/globalVariables";

dayjs.extend(realtiveTime);
type Props = {
  article: Article;
};
// Definierar en funktionskomponent som heter ArticleView
export const ArticleView: FC<Props> = ({ article }: any) => {
  // Initierar en state-variabel som heter "article" med värdet null
  const [expanded, setExpanded] = useState(false);
  const [timeStamp, setTimeStamp] = useState("");

  function handleClick() {
    setExpanded(!expanded);
  }

  // function handleFacebookShare() {
  //   const url = `https://www.facebook.com/sharer/sharer.php?href=https://www.aftonbladet.se/`;
  //   window.open(url, '_blank', 'noopener noreferrer');
  // }

  // Renderar komponenten
  useEffect(() => {
    if (dayjs().isSame(article.attributes.createdAt.split("T")[0], "day")) {
      const newDateSV = dayjs(article.attributes.createdAt)
        .locale("sv")
        .format("dddd, MMMM D, YYYY h:mm A");
      const newDate = newDateSV.charAt(0).toUpperCase() + newDateSV.slice(1);
      setTimeStamp(dayjs(newDate).locale("sv").fromNow());
    } else {
      setTimeStamp(article.attributes.createdAt.split("T")[0]);
    }
  }, []);

  return (
    <div onClick={() => handleClick()} key={article.id}>
      <div className="mb-2 sm:mb-2 border-box border-b-2 border-slate-200 drop-shadow-md bg-white cursor-pointer">
        <div className="relative">
          <div className="absolute h-full w-full z-10 hover:bg-slate-100 hover:bg-opacity-10 "></div>
          {/* Visar artikelns bild om det finns någon */}
          {article.attributes.Bild.data !== undefined ? (
            <img
              src={`${strapiURL}${article.attributes.Bild.data[0].attributes.url}`}
              alt=""
              className="w-full"
            />
          ) : (
            // Om det inte finns någon bild visas texten "Image:404"
            <div>Image:404</div>
          )}
        </div>

        <div className="pt-4 pl-4 pr-4 pb-2">
          {/* Visar artikelns rubrik och ingress */}
          <div className="text-[26px] md:text-[40px] font-rubrik  mb-3 tracking-tight leading-none">
            {article.attributes.Rubrik}
          </div>
          {expanded ? (
            <>
              <div className="text-[16px] md:text-[18px] font-ingress font-bold mb-2">
                {article.attributes.Ingress}
              </div>
              <div className="font-brodtext text-[16px] md:text-[18px]">
                {article.attributes.Brodtext}
              </div>
              <div className="text-sm text-teal-700 pt-2 flex justify-between">
                {article.attributes.skribent.data.attributes.Namn}
                <FacebookShareButton
                  className="flex overflow-hidden"
                  url={`http://127.0.0.1:5173/${article.id}`}
                >
                  <FontAwesomeIcon
                    className="text-teal-600"
                    icon={faFacebookSquare}
                    size="2xl"
                  />
                </FacebookShareButton>
              </div>
              <div className=" flex justify-between p-2">
                <ShowAds direction="row" amount={2} />
              </div>
            </>
          ) : (
            <div>
              <div className="relative md:h-24 lg:h-48 xl:h-24 h-16">
                <div className="absolute inset-0">
                  <div className="text-[16px] md:text-[18px] text-ellipsis overflow-hidden h-full font-ingress font-bold mb-1">
                    {article.attributes.Ingress}
                  </div>
                </div>
                <div className="absolute top-0 bg-gradient-to-t from-white h-full w-full" />
              </div>
              <div className="text-sm text-gray-500 flex items-end justify-between">
                {timeStamp}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
