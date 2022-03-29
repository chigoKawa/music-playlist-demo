import { Badge, Card, Menu } from "@contentful/f36-components";
import _ from "lodash";
import { useRouter } from "next/router";
import { useAppContext } from "../context/state";
const Xray = (props) => {
  const sharedContext = useAppContext();
  const xrayMode = _.get(sharedContext, "state.xrayMode"); //xray mode from shared state
  const router = useRouter();

  // if not xray mode
  if (!xrayMode) {
    return (
      <div
        className="lg:p-8 
        mb-4 w-full min-w-max flex flex-col 
        items-center flex-wrap overflow-auto "
      >
        {props.children}
      </div>
    );
  }

  const entryId = _.get(props, "entryId");
  const contentType = _.get(props, "contentType");
  const entryTitle = _.get(props, "entryTitle");

  let url = `https://app.contentful.com/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_ENVIRONMENT}`;

  url = `${url}/entries/${entryId}`;
  return (
    <div
      className="lg:p-8 bg-gray-100 
    mb-4 w-full min-w-maxx flex flex-col 
    items-center flex-wrap  overflow-autox   "
    >
      <Card
        title={contentType}
        isHovered
        badge={<Badge variant="primary">{entryTitle}</Badge>}
        actions={[
          <Menu.Item as="a" href={url} target="_blank" key="view">
            View in Contentful
          </Menu.Item>,
        ]}
      >
        <div className="text-white flex flex-col  overflow-autox w-full ">
          {props.children}
        </div>
      </Card>
      {/* <div className="border-2 p-2"> {props.children}</div> */}
    </div>
  );
};

export default Xray;
