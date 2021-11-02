import _ from "lodash";
import EachChart from "../components/EachChart";
const ChartLayout = (props) => {
  const chartEntries = _.get(props, "chartEntries.items");
  const chartEntriesIncludes = _.get(props, "chartEntries.includes");
  return (
    <>
       
      {Array.isArray(chartEntries)
        ? chartEntries.map((item, index) => {
            return (
              <EachChart
                key={index}
                item={item}
                chartEntriesIncludes={chartEntriesIncludes}
                client={props.client}
              />
            );
          })
        : ""}
      {props.children}
    </>
  );
};

export default ChartLayout;
