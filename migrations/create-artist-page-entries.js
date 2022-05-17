const _ = require("lodash");
const slugify = require("slugify");
const contentful = require("contentful-management");
module.exports = async function(
    migration, { makeRequest, spaceId, accessToken }
) {
    const artistEntries = await makeRequest({
        method: "GET",
        // url: `/content_types?sys.id[in]=artist`,
        url: `/entries?content_type=artist`,
    });
    migration.transformEntriesToType({
        sourceContentType: "artist",
        targetContentType: "artistPage",
        from: ["name"],
        shouldPublish: true,
        updateReferences: true,
        removeOldEntries: false,
        // identityKey: function(fields) {
        //     const value = fields.woofs["en-US"].toString();
        //     return MurmurHash3(value).result().toString();
        // },
        identityKey: async(fromFields) => {
            const name = _.get(fromFields, "name['en-US']");
            artistEntries.items.map((item) => {
                const title = _.get(item, "fields.name.en-US");
                const entryId = _.get(item, "sys.id");

                if (name && title) {
                    if (title.toLowerCase() === name.toLowerCase()) {
                        return entryId;
                    } else {
                        return Math.random();
                    }
                }
            });
            return Math.random();

            // return fromFields.name["en-US"].toLowerCase().replace(" ", "-");
        },
        transformEntryForLocale: function(fromFields, currentLocale) {
            const name = _.get(fromFields, "name.en-US");
            if (name) {
                const slug = slugify(name.toLowerCase());
                const internalTitle = name;
                console.log("oyio", slug, name);

                const getItem = artistEntries.items.find((item) => {
                    const title = _.get(item, "fields.name.en-US");
                    const entryId = _.get(item, "sys.id");

                    if (name && title) {
                        if (title.toLowerCase() === name.toLowerCase()) {
                            return item;
                        }
                    }
                });
                const artistId = _.get(getItem, "sys.id");
                if (artistId && name && slug) {
                    console.log("oyio2", artistId);
                    return {
                        name,
                        slug,
                        internalTitle,
                        artist: {
                            sys: { type: "Link", linkType: "Entry", id: artistId },
                        },
                    };
                }

                return false;
            }
            return false;
            // return {
            //     woofs: `copy - ${fromFields.woofs[currentLocale]}`,
            // };
        },
    });

    // const anyOtherTool = new AnyOtherTool({ spaceId, accessToken })
};