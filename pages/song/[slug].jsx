import _ from "lodash";
import Head from "next/head";
// import ImageComponent from "../../components/ImageComponent";
// import { getEntriesByContentType } from "../../lib/helpers";
// import { getEntriesByContentType } from "../../lib/tool";
import { getEntriesByContentType } from "../../lib/contentful/client";
// import richtextRenderOptions from "../../lib/richtextRenderOptions";

const ProductPage = ({ page }) => {
  console.log("static props", page);
  // const page = _.get(page, "product.items[0]");
  const contentType = _.get(page, "sys.contentType.sys.id");
  const productId = _.get(page, "sys.id");
  const fields = _.get(page, "fields");
  const title = _.get(page, "fields.title");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="p-20 flex flex-col space-y-4 h-screen items-center">
        {JSON.stringify(page)}
        {title}
        <div className="">
          {/* {documentToReactComponents(fields.description, richtextRenderOptions)} */}
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const productEntries = await getEntriesByContentType("songPage");

  let paths = [];
  if (productEntries) {
    try {
      paths = productEntries.items.map((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        return { params: { slug: slugVal } };
      });
    } catch (error) {}
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  try {
    const slug = _.get(context, "params.slug");
    const songPage = await getEntriesByContentType("songPage", slug);
    const page = _.get(songPage, "items[0]");
    console.log("get songPage", page);
    return {
      props: { page },
    };
  } catch (error) {
    return {
      props: { page: {} },
    };
  }
}

export default ProductPage;
