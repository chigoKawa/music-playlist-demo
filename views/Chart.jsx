import ChartLayout from "../layouts/ChartLayout";
import _ from "lodash";

const Chart = (props) => {
  const chartEntries = _.get(props, "chartEntries");

  return (
    <>
      {JSON.stringify(chartEntries)}
      <ChartLayout client={props.client} chartEntries={chartEntries}>
        Chart{" "}
      </ChartLayout>
    </>
  );
};

export default Chart;
