// require("dotenv").config();
import * as contentful from "contentful";
// import config from "../components/config";

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN;
const preview_token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

const getOptions = (is_preview) => {
  let options = {};

  // let space_id = "";
  // let access_token = "";
  options.space = space_id;
  options.host = is_preview ? "preview.contentful.com" : undefined;
  options.accessToken = is_preview ? preview_token : access_token;
  options.environment = environment ? environment : "master";
  options.resolveLinks = true;

  return options;
};

const getChartEntries = async (content_type) => {
  const options = getOptions(false);

  const contentfulClient = contentful.createClient(options);
  if (contentfulClient) {
    return contentfulClient
      .getEntries({
        // "fields.title": "*",
        content_type: content_type,
        include: 10,
      })
      .then((entries) => {
        const items = _.get(entries, "items");
        const includes = _.get(entries, "includes");
        // console.log("getChartEntries error", entries);

        return { items, includes };
      })
      .catch((er) => {
        console.log("getChartEntries error", er);
        return er;
      });
  } else {
    return false;
  }
};

const getEntry = async (id) => {
  const options = getOptions(false);
  const contentfulClient = contentful.createClient(options);
  if (contentfulClient) {
    return contentfulClient
      .getEntry(id, {
        include: 10,
      })
      .then((entry) => {
        console.log("getEntry val", entry);

        return entry;
      })
      .catch((er) => {
        console.log("getEntry error", er);
        return er;
      });
  } else {
    return false;
  }
};

const getEntriesByContentType = async (content_type, slug = null) => {
  const options = getOptions(false);

  try {
    const contentfulClient = contentful.createClient(options); // https://contentful.github.io/contentful.js/contentful/9.1.9/contentful.html#.createClient
    if (contentfulClient) {
      let params = { content_type: content_type, include: 3 }; //include -> to retrieve related data(linked entries) in same request, number of levels is 3

      if (slug) {
        params["fields.slug"] = slug;
      }

      let entries = await contentfulClient.getEntries(params); // https://contentful.github.io/contentful.js/contentful/9.1.9/ContentfulClientAPI.html#.getEntries

      const items = _.get(entries, "items");

      return { items };
    } else {
      return false;
    }
  } catch (error) {
    console.log("any errors? ->", error);
    return false;
  }
};

const getEntriesByContentTypeWithFilter = async (
  content_type,
  slug = null,
  addParams = null,
  preview = false
) => {
  const client = contentful.createClient(getOptions(preview));
  if (client) {
    let params = { content_type: content_type, include: 3 }; //include -> to retrieve related data(linked entries) in same request, number of levels is 3

    if (slug) {
      params["fields.slug"] = slug;
    }
    if (addParams) {
      params = { ...params, ...addParams };
    }

    let entries = await client.getEntries(params); // https://contentful.github.io/contentful.js/contentful/9.1.9/ContentfulClientAPI.html#.getEntries
    const limit = entries?.limit;
    const total = entries?.total;
    const skip = entries?.skip;
    const items = entries?.items;
    // console.log("olu", items)
    return { items, limit, total, skip };
  } else {
    return false;
  }

  return getOptions(preview);
};

export {
  getChartEntries,
  getEntry,
  getEntriesByContentType,
  getEntriesByContentTypeWithFilter,
};
