module.exports = function(migration) {
    const artistPage = migration
        .createContentType("artistPage")
        .name("Artist Page")
        .description("Artist Page")
        .displayField("name");
    artistPage
        .createField("internalTitle")
        .name("Internal Title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    artistPage
        .createField("name")
        .name("Name")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);
    artistPage
        .createField("slug")
        .name("Slug")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);
    artistPage
        .createField("artist")
        .name("Artist")
        .type("Link")
        .localized(false)
        .required(true)
        .validations([{
            linkContentType: ["artist"],
        }, ])
        .linkType("Entry")
        .disabled(false)
        .omitted(false);
    artistPage
        .createField("components")
        .name("Components")
        .type("Array")
        .localized(false)
        .required(false)
        .validations([])
        .items({
            type: "Link",
            validations: [{
                linkContentType: [
                    "imageGallery",
                    "imageWithFocalPoint",
                    "songPage",
                    "youtubeVideo",
                ],
            }, ],
            linkType: "Entry",
        })
        .disabled(false)
        .omitted(false);

    artistPage.changeFieldControl("slug", "builtin", "slugEditor");
};