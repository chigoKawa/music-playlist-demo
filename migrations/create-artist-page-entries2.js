const _ = require("lodash");
const slugify = require("slugify");
const contentful = require("contentful-management");
module.exports = async function(
    migration, { makeRequest, spaceId, accessToken }
) {
    migration.deriveLinkedEntries({
        contentType: "artist",
        derivedContentType: "artistPage",
        from: ["artist"],
        toReferenceField: "artist",
        derivedFields: ["name"],
        identityKey: async(fromFields) => {
            return slugify(fromFields.name.toLowerCase());
            return fromFields.owner["en-US"].toLowerCase().replace(" ", "-");
        },
        shouldPublish: true,
        deriveEntryForLocale: async(inputFields, locale) => {
            if (locale !== "en-US") {
                return;
            }

            const name = _.get(inputFields, "name.en-US");
            const slug = slugify(title.toLowerCase());

            return {
                internalTitle: name,
                name,
                slug,
            };
        },
    });

    const artistEntries = await makeRequest({
        method: "GET",
        // url: `/content_types?sys.id[in]=artist`,
        url: `/entries?content_type=artist`,
    });

    try {
        artistEntries.items.map((entry) => {
            const title = _.get(entry, "fields.name.en-US");
            const entryId = _.get(entry, "sys.id");

            // console.log("entry!", entryId);
            // return;
            setTimeout(async() => {
                if (title) {
                    // create page entry
                    const client = contentful.createClient({
                        accessToken: accessToken,
                    });
                    try {
                        await client
                            .getSpace(spaceId)
                            .then((space) => space.getEnvironment("del"))
                            .then((environment) => {
                                return environment
                                    .createEntry("artistPage", {
                                        fields: {
                                            internalTitle: {
                                                "en-US": title,
                                            },
                                            name: {
                                                "en-US": title,
                                            },
                                            slug: {
                                                "en-US": slugify(title.toLowerCase()),
                                            },
                                            artist: {
                                                "en-US": {
                                                    sys: { type: "Link", linkType: "Entry", id: entryId },
                                                },
                                            },
                                            // components: {
                                            //     "en-US": title,
                                            // },
                                        },
                                    })
                                    .then((artist) => artist.publish());
                            })
                            .then((entry) => console.log(entry))
                            .catch(console.error);
                    } catch (error) {
                        console.log("error occured", error);
                    }
                    console.log("entry! done", title);
                }
            }, 2000);
        });
        return true;
    } catch (error) {
        return false;
    }

    // const anyOtherTool = new AnyOtherTool({ spaceId, accessToken })
};