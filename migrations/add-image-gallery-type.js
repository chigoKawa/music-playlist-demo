module.exports = function(migration) {
    const imageGallery = migration
        .createContentType("imageGallery")
        .name("Image Gallery")
        .description("Component for image gallery")
        .displayField("title");
    imageGallery
        .createField("internalTitle")
        .name("Internal Title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    imageGallery
        .createField("title")
        .name(" Title")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);
    imageGallery
        .createField("images")
        .name("Images")
        .type("Array")
        .localized(false)
        .required(false)
        .validations([{
            size: {
                min: 1,
            },
            message: "You need to add at least on image",
        }, ])
        .items({
            type: "Link",
            validations: [{
                linkContentType: ["mediaWrapper"],
            }, ],
            linkType: "Entry",
        })
        .disabled(false)
        .omitted(false);
};