import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { strapiURL, testURL } from "../assets/globalVariables";

type Props = {
  direction?: "row" | "column";
  amount?: number;
};

export const ShowAds: FC<Props> = ({
  direction = "column",
  amount = Infinity,
}) => {
  const [ads, setAds] = useState<any[]>([]);

  const getData = async () => {
    const response = await fetch(`${testURL}/reklam/ads`);
    const data = (await response.json()) as any;

    const randomizedOrder = [...data.data]
      .sort((a: any, b: any) => 0.5 - Math.random())
      .filter((_, index) => index < amount);


    setAds(randomizedOrder);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className={classNames("flex flex-wrap justify-center ", {
        "flex-row": direction === "row",
        "flex-col": direction === "column",
      })}
    >
      {ads.map((ad) => (
        <Link to={ad.attributes.URL} key={ad.id}>
          <img
            className="m-2 border border-black w-20 sm:mb-2 sm:border sm:border-black sm:w-40 sm:mr-2"
            src={`${strapiURL}${ad.attributes.bild.data[0].attributes.url}`}
            alt=""
          />
        </Link>
      ))}
    </div>
  );
};
