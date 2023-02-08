import { HomeIcon, MusicNoteIcon } from "@heroicons/react/solid";
import _ from "lodash";
import Link from "next/link";
import { useAppContext } from "../context/state";
const Nav = (props) => {
  const sharedContext = useAppContext();
  console.log("shared context", sharedContext);
  const setXrayMode = _.get(sharedContext, "setXrayMode");
  const xrayMode = _.get(sharedContext, "state.xrayMode");
  const onToggleChange = (e) => {
    setXrayMode(!xrayMode);
    // console.log("xrayMode", e.target.checked);
  };
  return (
    <div className="flex p-4 flex-col bg-cf-link-600 bg-black  border-blau text-white  border-b-2 w-full px-10">
      <div className="flex flex-row space-x-4 justify-between max-w-7xlx m-autox w-full">
        {/* <div className="flex flex-row"></div> */}
        <div className="md:w-3/4c flex flex-row space-x-2">
          <Link href="/" passHref>
            <div className="uppercase flex flex-row space-x-2">
              <HomeIcon className="h-5 w-5 text-blau" />

              <span className=""> Playlist App</span>
            </div>
          </Link>
          {/* <Link href="/">
            <MusicNoteIcon className="h-5 w-5 text-gelb" />
          </Link> */}
        </div>

        <div className="flex flex-row space-x-4 items-center justify-items-center">
          {/* <div className="">Menu</div> */}
          <div className="flex flex-row m-auto justify-items-center items-center bg-red-100x">
            <div className="flex h-10x  items-center w-full ">
              <label
                htmlFor="toggleOne"
                className="flex items-center cursor-pointer"
              >
                <div className="relative flex flex-row  space-x-2">
                  <div className="relative">
                    <input
                      value={xrayMode}
                      onChange={onToggleChange}
                      id="toggleOne"
                      type="checkbox"
                      className="sr-only"
                    />

                    <div className="w-10 h-4  bg-gelb rounded-full shadow-inner"></div>

                    <div
                      className={`dot absolute w-6 h-6 ${
                        xrayMode ? "translate-x-full bg-cf-green-400" : ""
                      }  bg-blau4 
                rounded-full shadow -left-1 -top-1 transition`}
                    ></div>
                  </div>

                  <div className=" text-xs"> Xray-Mode</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
