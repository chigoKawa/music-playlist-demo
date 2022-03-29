const _ = require("lodash");

const fakeBiography2 = {
    nodeType: "document",
    data: {},
    content: [{
            nodeType: "paragraph",
            content: [{
                nodeType: "text",
                marks: [],
                value: "I am an odd paragraph.",
                data: {},
            }, ],
            data: {},
        },
        {
            nodeType: "paragraph",
            content: [{
                nodeType: "text",
                marks: [],
                value: "I am even.",
                data: {},
            }, ],
            data: {},
        },
    ],
};

const fakeBiography = {
    nodeType: "document",
    content: [{
        nodeType: "paragraph",
        content: [{
                nodeType: "text",
                value: "Hello",
                marks: [{ type: "bold" }],
                data: {},
            },
            {
                nodeType: "text",
                value: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!",
                marks: [{ type: "italic" }],
                data: {},
            },
        ],
        data: {},
    }, ],
    data: {},
};
//create featuredImage field and copy image content to featured image
module.exports = function(migration) {
    const artist = migration.editContentType("artist");
    artist
        .createField("featuredImage")
        .name("Featured Image")
        .type("Link")
        .localized(false)
        .required(true)
        .validations([{
            linkContentType: ["mediaWrapper"],
        }, ])
        .linkType("Entry")
        .disabled(false)
        .omitted(false);

    migration.transformEntries({
        contentType: "artist",
        from: ["image"],
        to: ["featuredImage"],
        transformEntryForLocale: function(fromFields, currentLocale) {
            // if (currentLocale === "de-DE") {
            //     return;
            // }

            try {
                const oldImageId = _.get(fromFields, "image.en-US[0].sys.id") ?
                    _.get(fromFields, "image.en-US[0].sys.id") :
                    "5nLI797V68AKPC220EgJsB";

                let returnedObject = {};
                if (oldImageId) {
                    // "en-US": {
                    //     sys: { type: "Link", linkType: "Entry", id: entryId },
                    // },
                    const derivedFeaturedImg = {
                        sys: { type: "Link", linkType: "Entry", id: oldImageId },
                    };

                    returnedObject.featuredImage = derivedFeaturedImg;
                    return returnedObject;
                }

                return;
            } catch (error) {
                console.log("ERROR occured,", error);
            }
        },
    });

    // populate biography field if empty
    migration.transformEntries({
        contentType: "artist",
        from: ["biography"],
        to: ["biography"],
        transformEntryForLocale: function(fromFields, currentLocale) {
            // if (currentLocale === "de-DE") {
            //     return;
            // }

            try {
                const tempEntry = _.get(fromFields, "biography.en-US.content");

                if (tempEntry) {
                    if (tempEntry.length < 1) {
                        console.log("tempEntry occured,", tempEntry.length, fromFields);
                        // type: "RichText",
                        let returnedObject = {};
                        returnedObject.biography = fakeBiography;
                        console.log("fromfields", tempEntry.length);
                        return returnedObject;
                    } else {
                        return;
                    }
                } else {
                    let returnedObject = {};
                    returnedObject.biography = fakeBiography;

                    return returnedObject;
                }

                return;
            } catch (error) {
                console.log("ERROR occured,", error);
            }
        },
    });
};