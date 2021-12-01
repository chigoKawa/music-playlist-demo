import _ from "lodash";
const ImageShow = (props) => {
  const src = _.get(props, "src");
  return (
    <div className="w-full p-10 bg-red-500">
      {" "}
      <img src={src} />
    </div>
  );
};

export default ImageShow;
