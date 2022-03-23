// import _ from "lodash";
// import EachChart from "../components/EachChart";
import { HomeIcon, MusicNoteIcon } from "@heroicons/react/solid";
// import Link from "next/link";
const MainLayout = (props) => {
  return (
    <div>
      <div className="flex flex-col space-y-2x relative">
        <div className="  fixedx w-full flex flex-row bg-black border-blau text-white  border-b-2 p-8">
          <div className="w-full order-first flex flex-row space-x-4">
            <div className="">
              <a className="cursor-pointer" href="/">
                <HomeIcon className="h-5 w-5 text-blau" />
              </a>
            </div>
            <div className="">
              <a className="cursor-pointer" href="/">
                <MusicNoteIcon className="h-5 w-5 text-gelb" />
              </a>
            </div>
          </div>
          <div className=" order-last">Menu</div>
        </div>
        <main className="">
          <div className="flex flex-col overflow-hidden  bg-black">
            {props.children}
            {/* <section></section> */}
          </div>
        </main>
      </div>
    </div>
  );
  return (
    <div className=" w-full overflow-hidden flex flex-col relative min-h-screen ">
      <div className="fixed w-full flex flex-row bg-black border-blau text-white  border-b-2 ">
        <div className=" w-2/12  p-4 ">
          <a className="cursor-pointer" href="/">
            <HomeIcon className="h-5 w-5 text-blau" />
          </a>
        </div>
        <div className=" w-fullx text-center p-4 ">
          <a className="cursor-pointer" href="/">
            <MusicNoteIcon className="h-5 w-5 text-gelb" />
          </a>
        </div>
        <div className=" w-fullx text-center p-4 ">
          <a className="cursor-pointer" href="/">
            <MusicNoteIcon className="h-5 w-5 text-rot" />
          </a>
        </div>
      </div>
      <main className="">
        <div className="flex flex-col overflow-hidden  bg-black">
          {props.children}
          {/* <section></section> */}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
