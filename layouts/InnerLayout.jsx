// import _ from "lodash";
// import Link from "next/link";
const InnerLayout = (props) => {
  return (
    <div>
      <div className="h-full md:max-w-2xl w-full lg:max-w-7xl m-auto p-2x md:py-20x md:px-40x relative flex flex-col overflow-hidden  bg-black">
        {props.children}
      </div>
    </div>
  );
};

export default InnerLayout;
