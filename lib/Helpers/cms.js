import * as contentful from "contentful";
import _ from "lodash";
// import Settings from "../settings";

// const TEST_IMAGE_URL =
//     "https://images.ctfassets.net/34zhepmq2vpx/4ClyFr0XGwcOiKUMyyiMKO/c47e029fa790bf3c01b8900bd6cacf87/TWD_Test_Image6.png";

const getOptions = (is_preview) => {
    let options = {};

    let space_id = "";
    let access_token = "";
    options.space = space_id ? space_id : Settings.space_id;
    options.host = is_preview ? "preview.contentful.com" : undefined;
    options.accessToken = access_token ?
        access_token :
        is_preview ?
        Settings.CPA :
        Settings.CDA;
    // options.environment = config.environment ? config.environment : "demo";
    return options;
};

export const getAllLocales = async() => {
    const options = getOptions(false);
    const contentfulClient = contentful.createClient(options);

    let loca = await contentfulClient
        .getLocales()
        .then((locales) => {
            let dataType = _.get(locales, "sys.type");
            let items = _.get(locales, "items");
            if (dataType === "Array") {
                return items;
            } else {
                return false;
            }
        })
        .catch((er) => {
            console.log("Error LOCALES", er);
            return false;
        });
};

export const getEntriesByType = async(contentType, setter) => {
    const options = getOptions();
    const contentfulClient = contentful.createClient(options);

    let posts = await contentfulClient
        .getEntries({
            content_type: contentType,
            // locale: "de-DE",
            // "fields.slug": "post"
            include: 10,
        })
        .then((entries) => {
            console.log(contentType, entries);
            let dataType = _.get(entries, "sys.type");
            let items = _.get(entries, "items");
            let includes = _.get(entries, "includes");

            if (items) {
                if (setter) {
                    setter({ items, includes });
                }
                return { items, includes };
            } else {
                return false;
            }
        })
        .catch((er) => {
            console.log("ERROR", er);
            return false;
        });

    return posts;
};

export const getAllPostsForHome = async(preview) => {
    const options = getOptions(preview);
    const contentfulClient = contentful.createClient(options);

    let posts = await contentfulClient
        .getEntries({
            content_type: "lesson",
            // locale: "de-DE",
            // "fields.slug": "post"
            include: 10,
        })
        .then((entries) => {
            console.log("PAGES", entries);
            let dataType = _.get(entries, "sys.type");
            let items = _.get(entries, "items");

            if (items) {
                return items;
            } else {
                return false;
            }
        })
        .catch((er) => {
            console.log("ERROR", er);
            return false;
        });

    return posts;
};

export const getPreviewPostBySlug = async(slug) => {
    const options = getOptions(true);
    const contentfulClient = contentful.createClient(options);

    let posts = await contentfulClient
        .getEntries({
            content_type: "post",
            // locale: "de-DE",
            "fields.slug": slug,
        })
        .then((entries) => {
            let dataType = _.get(entries, "sys.type");
            let fields = _.get(entries, "items[0].fields");

            return fields;
        })
        .catch((er) => {
            console.log("ERROR", er);
            return false;
        });

    return posts;
};

// posts with slug
// @param: boolean
export const getAllPostsWithSlug = async(preview) => {
    const options = getOptions(preview);
    const contentfulClient = contentful.createClient(options);

    let pages = await contentfulClient
        .getEntries({
            content_type: "post",
            // locale: "de-DE",
            // "fields.slug": "**"
        })
        .then((entries) => {
            let items = _.get(entries, "items");

            const itemsWithSlug = items.filter((entry) => {
                const slugVal = _.get(entry, "fields.slug");
                if (slugVal) {
                    return entry;
                }
            });

            if (itemsWithSlug) {
                return itemsWithSlug;
            } else {
                return false;
            }
        })
        .catch((er) => {
            console.log("ERROR", er);
            return false;
        });

    return pages;
};

export const getPostAndMorePosts = async(slug, preview) => {
    const options = getOptions(preview);

    const contentfulClient = contentful.createClient(options);

    let posts = await contentfulClient
        .getEntries({
            content_type: "post",
            // locale: "de-DE",
            // "fields.slug": slug
        })
        .then((entries) => {
            let items = _.get(entries, "items");
            //   item that matches the provided slug
            const itemsWithThisSlug = items.filter((entry) => {
                const fields = _.get(entry, "fields");
                const slugVal = _.get(entry, "fields.slug");

                if (slugVal === slug) {
                    return fields;
                }
            });
            //   all others -> morePosts
            const itemsWithoutThisSlug = items.filter((entry) => {
                const slugVal = _.get(entry, "fields.slug");
                if (slugVal != slug) {
                    return entry;
                }
            });

            return {
                post: itemsWithThisSlug,
                morePosts: itemsWithoutThisSlug,
            };
        })
        .catch((er) => {
            console.log("ERROR", er);
            return false;
        });

    return posts;
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