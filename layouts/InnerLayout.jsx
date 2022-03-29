// import _ from "lodash";
// import Link from "next/link";
const InnerLayout = (props) => {
  return (
    <div>
      <div className="h-full p-2 md:py-20 md:px-40 relative flex flex-col overflow-hidden  bg-black">
        {props.children}
      </div>
    </div>
  );
};

export default InnerLayout;
