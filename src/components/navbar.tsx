import { NavLink, useLocation } from "react-router-dom";
import { DropDown } from "./dropDown";
import { SearchBar } from "./searchBar";
import { MobileSearch } from "./mobileSearch";

export const Navbar = () => {
  const location = useLocation();
  window.scrollTo({top:0})

  return (
    <div className="bg-white sticky top-0 z-10 lg:grid grid-cols-11 gap-x-3">
      <div className="relative col-start-0 col-span-10 lg:col-start-4 lg:col-span-5">
        <div className="container   flex justify-between items-center min-w-full">
          <div className=" flex items-center space-x-5 h-full">
            <div className=" text-2xl md:text-3xl p-4 flex justify-between  ">
              <ul className="flex space-x-3 ">
                <li>
                  <DropDown />
                </li>
                <li>
                  <NavLink
                    className="align-middle sm:align-baseline text-3xl"
                    to="/"
                  >
                    KumlaNytt
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="hidden sm:flex h-full ">
              <NavLink
                className={` ${
                  location.pathname == "/" ? "active-link" : ""
                }  h-100 text-sm font-serif text-gray-400 hover:border-b-2 hover:text-black focus:text  hover:border-b-teal-700 flex items-center `}
                to="/"
              >
                <div className="pb-6 pt-6">Toppnyheter</div>
              </NavLink>
            </div>
            <div className=" hidden sm:flex h-full">
              <NavLink
                className={` ${
                  location.pathname == "/Senaste-nytt" ? "active-link" : ""
                }  h-100 text-sm font-serif text-gray-400 hover:border-b-2 hover:text-black focus:text  hover:border-b-teal-700 flex items-center   `}
                to="/Senaste-nytt"
              >
                <div className="pb-6 pt-6">Senaste nytt</div>
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:block md:text-3xl ">
            <SearchBar />
          </div>
          <div className=" sm:hidden">
            <MobileSearch />
          </div>
        </div>

        <div className="grid grid-cols-2 bg-stone-100 border-t-2 pt-2 sm:hidden">
          <div className="sm:hidden flex h-full justify-center w-full">
            <NavLink
              className={`w-full ${
                location.pathname == "/" ? "active-link" : ""
              } h-100 text-sm font-serif text-gray-400 hover:border-b-2 hover:text-black focus:text  hover:border-b-teal-700 h-full flex items-center justify-center`}
              to="/"
            >
              <div className="pb-2">Toppnyheter</div>
            </NavLink>
          </div>
          <div className="sm:hidden flex h-full justify-center w-full">
            <NavLink
              className={` w-full ${
                location.pathname == "/Senaste-nytt" ? "active-link" : ""
              } h-100 text-sm font-serif text-gray-400 hover:border-b-2 hover:text-black focus:text  hover:border-b-teal-700 h-full flex items-center  justify-center`}
              to="/Senaste-nytt"
            >
              <div className="pb-2">Senaste nytt</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
