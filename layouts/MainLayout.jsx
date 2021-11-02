// import _ from "lodash";
// import EachChart from "../components/EachChart";
import { HomeIcon, MusicNoteIcon } from "@heroicons/react/solid";
// import Link from "next/link";
const MainLayout = (props) => {
  return (
    <div className="w-full overflow-hidden flex flex-col relative min-h-screen">
      <div className="fixed w-full bg-red-500 flex flex-row">
        <div className=" w-2/12  p-4 ">
          <a className="cursor-pointer" href="/">
            <HomeIcon className="h-5 w-5 " />
          </a>
        </div>
        <div className=" w-fullx text-center p-4 ">
          <a className="cursor-pointer" href="/">
            <MusicNoteIcon className="h-5 w-5 text-blue-500" />
          </a>
        </div>
        <div className=" w-fullx text-center p-4 ">
          <a className="cursor-pointer" href="/">
            <MusicNoteIcon className="h-5 w-5 text-blue-100" />
          </a>
        </div>
      </div>
      <main className="">
        <div className="flex flex-col overflow-hidden">
          <section>{props.children}</section>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
