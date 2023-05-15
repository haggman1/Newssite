import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { strapiURL } from "../assets/globalVariables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFutbol,
  faChartColumn,
  faHandshake,
  faMasksTheater,
} from "@fortawesome/free-solid-svg-icons";

export const DropDown = () => {
  const [Categories, setCategories] = useState<any[]>([]);
  const getData = async () => {
    const response = await fetch(`${strapiURL}/api/kategoris`);

    const data = (await response.json()) as any;

    setCategories(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getIcon = (categoryName: string) => {
    if (categoryName === "Sport") {
      return <FontAwesomeIcon icon={faFutbol} size="sm" />;
    }
    if (categoryName === "Ekonomi") {
      return <FontAwesomeIcon icon={faChartColumn} size="sm" />;
    }
    if (categoryName === "Nöje & kultur") {
      return <FontAwesomeIcon icon={faMasksTheater} size="sm" />;
    }
    if (categoryName === "Politik") {
      return <FontAwesomeIcon icon={faHandshake} size="sm" />;
    }
  };

  return (
    <div>
      <Menu as="div" className="">
        <Menu.Button className="text-4xl font-bold sm:text-3xl sm:font-bold">
          <FontAwesomeIcon icon={faBars} size="sm" />
        </Menu.Button>
        <Menu.Items className="w-full pl-4 bg-white text-base font-bold absolute sm:pl-3 mt-5 left-0 sm:w-1/3 sm:h-60">
          Nyheter
          <div className="text-lg">
            {Categories.map((Categories) => (
              <Menu.Item key={Categories.id}>
                <NavLink to={`/viewCategory/${Categories.id}`}>
                  <div className="hover:bg-gray-100 mb-3 font-thin cursor-pointer pt-2 flex">
                    <div className="mr-2">
                      {getIcon(Categories.attributes.namn)}
                    </div>
                    {Categories.attributes.namn}
                  </div>
                </NavLink>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};
