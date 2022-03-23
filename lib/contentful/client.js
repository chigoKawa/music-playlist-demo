import * as contentful from "contentful";
import _ from "lodash";

const space_id = process.env.NEXT_PUBLIC_SPACE_ID;
const access_token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN;
const preview_token = process.env.NEXT_PUBLIC_PREVIEW_TOKEN;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

const getOptions = (is_preview) => {
    let options = {};
    options.space = space_id;
    options.host = is_preview ? "preview.contentful.com" : undefined;
    options.accessToken = is_preview ? preview_token : access_token;
    options.environment = environment ? environment : "master";
    options.resolveLinks = true;

    return options;
};

export const getAllLocales = async() => {
    const options = getOptions(false);
    const contentfulClient = contentful.createClient(options);
    try {
        let allLocales = await contentfulClient.getLocales();
        let dataType = _.get(allLocales, "sys.type");
        let items = _.get(allLocales, "items");
        if (dataType === "Array") {
            return items;
        } else {
            return false;
        }
    } catch (error) {
        console.log("getAllLocales error ", error);
    }
};

export const getEntriesByContentType = async(content_type, slug = null) => {
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

export const getCategoryArticles = async(
    content_type,
    category = null,
    categoryId
) => {
    const options = getOptions(false);

    try {
        const contentfulClient = contentful.createClient(options);
        if (contentfulClient) {
            let params = { content_type: content_type };
            //https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/links/links-to-a-specific-item/query-entries/console/js
            if (categoryId) {
                params["fields.article.sys.contentType.sys.id"] = "article";
                params["fields.article.fields.category.sys.id"] = categoryId;
                // params["fields.article.sys.contentType.sys.id"] = "article";
                // params["fields.category.sys.contentType.sys.id"] = "category";
                // params["fields.article.fields.title[match]"] = category;
                // params["fields.article.fields.category.fields.title[match]"] = category;
            }

            let entries = await contentfulClient.getEntries(params); // https://contentful.github.io/contentful.js/contentful/9.1.9/ContentfulClientAPI.html#.getEntries

            const items = _.get(entries, "items");
            console.log("!!@22222", categoryId, items);

            return items;
        } else {
            return false;
        }
    } catch (error) {
        console.log("any errors? ->", error);
        return false;
    }
};