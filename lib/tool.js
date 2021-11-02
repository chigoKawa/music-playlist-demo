import * as contentful from "contentful";
import _ from "lodash";
import config from "../components/config";

const getOptions = (is_preview) => {
    let options = {};

    let space_id = "";
    let access_token = "";
    options.space = space_id ? space_id : config.space_id;
    options.host = is_preview ? "preview.contentful.com" : undefined;
    options.accessToken = access_token ?
        access_token :
        is_preview ?
        config.preview_token :
        config.delivery_token;
    options.environment = config.environment ? config.environment : "demo";
    options.resolveLinks = true;

    return options;
};

const getChartEntries = async(content_type) => {
    const options = getOptions(false);
    const contentfulClient = contentful.createClient(options);
    if (contentfulClient) {
        return contentfulClient
            .getEntries({
                // "fields.title": "*",
                content_type: content_type,
                include: 10
            })
            .then((entries) => {
                const items = _.get(entries, "items");
                const includes = _.get(entries, "includes");
                console.log("getChartEntries error", entries);

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

const getEntry = async(id) => {
    const options = getOptions(false);
    const contentfulClient = contentful.createClient(options);
    if (contentfulClient) {
        return contentfulClient
            .getEntry(id)
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

export { getChartEntries, getEntry };