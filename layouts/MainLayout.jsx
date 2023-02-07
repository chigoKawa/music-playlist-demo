// import _ from "lodash";
// import EachChart from "../components/EachChart";
import { HomeIcon, MusicNoteIcon } from "@heroicons/react/solid";
import Nav from "./Nav";
// import Link from "next/link";
const MainLayout = (props) => {
  return (
    <div>
      <div className="flex flex-col  relative ">
        <Nav />
        <div className="h-full min-h-screen relative flex flex-col overflow-hidden  bg-black   ">
          {props.children}
        </div>

        <div className="relative text-center p-2 bg-black text-white border-t-2 ">
          FOR DEMONSTRATIONS & LEARNING{" "}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
