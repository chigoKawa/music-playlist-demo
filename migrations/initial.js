module.exports = function(migration) {
    const album = migration
        .createContentType("album")
        .name("Album")
        .description("")
        .displayField("internalTitle");
    album
        .createField("internalTitle")
        .name("internal title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    album
        .createField("title")
        .name("title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);

    album
        .createField("id")
        .name("ID")
        .type("Integer")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);

    album
        .createField("releaseDate")
        .name("release date")
        .type("Date")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);

    album
        .createField("artist")
        .name("artist")
        .type("Link")
        .localized(false)
        .required(false)
        .validations([{
            linkContentType: ["artist"],
            message: "Who owns this Album? Please Select Artist.",
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    album
        .createField("tracks")
        .name("tracks")
        .type("Array")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(true)
        .omitted(true)
        .items({
            type: "Link",
            validations: [],
            linkType: "Entry",
        });

    album.changeFieldControl("internalTitle", "builtin", "singleLine", {});
    album.changeFieldControl("title", "builtin", "singleLine", {});
    album.changeFieldControl("id", "builtin", "numberEditor", {});
    album.changeFieldControl("releaseDate", "builtin", "datePicker", {});
    album.changeFieldControl("artist", "builtin", "entryLinkEditor", {});
    album.changeFieldControl("tracks", "builtin", "entryLinksEditor", {});
    const playlist = migration
        .createContentType("playlist")
        .name("Playlist")
        .description("Playlist Assembly (Component)")
        .displayField("internalTitle");
    playlist
        .createField("internalTitle")
        .name("internal title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    playlist
        .createField("title")
        .name("title")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);

    playlist
        .createField("slug")
        .name("slug")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);

    playlist
        .createField("tracks")
        .name("tracks")
        .type("Array")
        .localized(false)
        .required(false)
        .validations([{
            size: {
                min: 1,
            },

            message: "Please Add At least 4 Tracks to This Chart. It's a freaking Chart!",
        }, ])
        .disabled(false)
        .omitted(false)
        .items({
            type: "Link",

            validations: [{
                linkContentType: ["song"],
            }, ],

            linkType: "Entry",
        });

    playlist
        .createField("image")
        .name("image")
        .type("Link")
        .localized(false)
        .required(true)
        .validations([{
            linkContentType: ["mediaWrapper"],
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    playlist
        .createField("imageWFp")
        .name("image w fp")
        .type("Link")
        .localized(false)
        .required(false)
        .validations([{
            linkContentType: ["imageWithFocalPoint"],
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    playlist.changeFieldControl("internalTitle", "builtin", "singleLine", {});
    playlist.changeFieldControl("title", "builtin", "singleLine", {});
    playlist.changeFieldControl("slug", "builtin", "slugEditor", {});
    playlist.changeFieldControl("tracks", "builtin", "entryLinksEditor", {});
    playlist.changeFieldControl("image", "builtin", "entryLinkEditor", {});
    playlist.changeFieldControl("imageWFp", "builtin", "entryLinkEditor", {});
    const flatSong = migration
        .createContentType("flatSong")
        .name("Flat_Song")
        .description("")
        .displayField("internalTitle");
    flatSong
        .createField("internalTitle")
        .name("internal title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    flatSong
        .createField("title")
        .name("title")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);

    flatSong
        .createField("id")
        .name("ID")
        .type("Integer")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);

    flatSong
        .createField("releaseDate")
        .name("release date")
        .type("Date")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    flatSong
        .createField("mediaUrl")
        .name("mediaUrl")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);
    flatSong
        .createField("artistName")
        .name("Artist Name")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    flatSong
        .createField("artistImage")
        .name("Artist Image")
        .type("Link")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
        .linkType("Asset");
    flatSong
        .createField("albumName")
        .name("Album Name")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);

    flatSong
        .createField("albumCover")
        .name("Album Cover")
        .type("RichText")
        .localized(false)
        .required(false)
        .validations([{
                enabledNodeTypes: [
                    "heading-1",
                    "heading-2",
                    "heading-3",
                    "heading-4",
                    "heading-5",
                    "heading-6",
                    "ordered-list",
                    "unordered-list",
                    "hr",
                    "blockquote",
                    "embedded-entry-block",
                    "embedded-asset-block",
                    "hyperlink",
                    "entry-hyperlink",
                    "asset-hyperlink",
                    "embedded-entry-inline",
                ],

                message: "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, link to entry, link to asset, and inline entry nodes are allowed",
            },
            {
                enabledMarks: ["bold", "italic", "underline", "code"],
                message: "Only bold, italic, underline, and code marks are allowed",
            },
        ])
        .disabled(false)
        .omitted(false);

    flatSong.changeFieldControl("internalTitle", "builtin", "singleLine", {});
    flatSong.changeFieldControl("title", "builtin", "singleLine", {});
    flatSong.changeFieldControl("id", "builtin", "numberEditor", {});
    flatSong.changeFieldControl("releaseDate", "builtin", "datePicker", {});
    flatSong.changeFieldControl("mediaUrl", "builtin", "singleLine", {});
    flatSong.changeFieldControl("artistName", "builtin", "singleLine", {});
    flatSong.changeFieldControl("artistImage", "builtin", "assetLinkEditor", {});
    flatSong.changeFieldControl("albumName", "builtin", "singleLine", {});
    flatSong.changeFieldControl("albumCover", "builtin", "richTextEditor", {});
    const artist = migration
        .createContentType("artist")
        .name("Artist")
        .description("")
        .displayField("internalTitle");
    artist
        .createField("internalTitle")
        .name("Internal Title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);

    artist
        .createField("id")
        .name("ID")
        .type("Integer")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);

    artist
        .createField("name")
        .name("Name")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    artist
        .createField("dob")
        .name("DOB")
        .type("Date")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    artist
        .createField("bio")
        .name("Bio")
        .type("Text")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(true)
        .omitted(false);

    artist
        .createField("image")
        .name("image")
        .type("Array")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
        .items({
            type: "Link",

            validations: [{
                linkContentType: ["mediaWrapper"],
            }, ],

            linkType: "Entry",
        });

    artist
        .createField("biography")
        .name("biography")
        .type("RichText")
        .localized(false)
        .required(false)
        .validations([{
                enabledMarks: ["bold", "italic", "underline", "code"],
                message: "Only bold, italic, underline, and code marks are allowed",
            },
            {
                enabledNodeTypes: [
                    "heading-1",
                    "heading-2",
                    "heading-3",
                    "heading-4",
                    "heading-5",
                    "heading-6",
                    "ordered-list",
                    "unordered-list",
                    "hr",
                    "blockquote",
                    "embedded-entry-block",
                    "embedded-asset-block",
                    "hyperlink",
                    "entry-hyperlink",
                    "asset-hyperlink",
                ],

                message: "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, link to Url, link to entry, and link to asset nodes are allowed",
            },
            {
                nodes: {},
            },
        ])
        .disabled(false)
        .omitted(false);

    artist.changeFieldControl("internalTitle", "builtin", "singleLine", {});
    artist.changeFieldControl("id", "builtin", "numberEditor", {});
    artist.changeFieldControl("name", "builtin", "singleLine", {});
    artist.changeFieldControl("dob", "builtin", "datePicker", {});
    artist.changeFieldControl("bio", "builtin", "markdown", {});
    artist.changeFieldControl("image", "builtin", "entryLinksEditor", {});
    artist.changeFieldControl("biography", "builtin", "richTextEditor", {});
    const song = migration
        .createContentType("song")
        .name("Song")
        .description("")
        .displayField("internalTitle");
    song
        .createField("internalTitle")
        .name("internal title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    song
        .createField("title")
        .name("title")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);

    song
        .createField("id")
        .name("ID")
        .type("Integer")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);

    song
        .createField("releaseDate")
        .name("release date")
        .type("Date")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);

    song
        .createField("artist")
        .name("artist")
        .type("Link")
        .localized(false)
        .required(true)
        .validations([{
            linkContentType: ["artist"],
            message: "Who owns this Song? Please Select the Artist.",
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    song
        .createField("album")
        .name("album")
        .type("Link")
        .localized(false)
        .required(false)
        .validations([{
            linkContentType: ["album"],
            message: "Select Album",
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    song
        .createField("mediaUrl")
        .name("mediaUrl")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(true)
        .omitted(false);

    song
        .createField("youtubeVideoId")
        .name("youtube Video ID")
        .type("Link")
        .localized(false)
        .required(false)
        .validations([{
            linkContentType: ["youtubeVideo"],
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    song.changeFieldControl("internalTitle", "builtin", "singleLine", {});
    song.changeFieldControl("title", "builtin", "singleLine", {});
    song.changeFieldControl("id", "builtin", "numberEditor", {});
    song.changeFieldControl("releaseDate", "builtin", "datePicker", {});
    song.changeFieldControl("artist", "builtin", "entryLinkEditor", {});
    song.changeFieldControl("album", "builtin", "entryLinkEditor", {});
    song.changeFieldControl("mediaUrl", "builtin", "singleLine", {});
    song.changeFieldControl("youtubeVideoId", "builtin", "entryCardEditor", {});
    const youtubeVideo = migration
        .createContentType("youtubeVideo")
        .name("Youtube Video")
        .displayField("title");
    youtubeVideo
        .createField("youtubeVideo")
        .name("Youtube Video")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);
    youtubeVideo
        .createField("title")
        .name("Title")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);
    youtubeVideo.changeFieldControl(
        "youtubeVideo",
        "app",
        "5q9FXk8U48pqFRIaxDtaFV", {}
    );
    youtubeVideo.changeFieldControl("title", "app", "5q9FXk8U48pqFRIaxDtaFV", {});
    const test = migration.createContentType("test").name("test").description("");

    test
        .createField("templateapp")
        .name("templateapp")
        .type("Link")
        .localized(false)
        .required(false)
        .validations([{
            linkContentType: ["imageWithFocalPoint", "template"],
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    test.changeFieldControl("templateapp", "builtin", "entryLinkEditor", {});
    const imageWithFocalPoint = migration
        .createContentType("imageWithFocalPoint")
        .name("Image with Focal Point")
        .displayField("title");
    imageWithFocalPoint
        .createField("title")
        .name("Title")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);
    imageWithFocalPoint
        .createField("image")
        .name("Image")
        .type("Link")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false)
        .linkType("Asset");
    imageWithFocalPoint
        .createField("focalPoint")
        .name("Focal point")
        .type("Object")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);
    const chart = migration
        .createContentType("chart")
        .name("Chart")
        .description("Chart Assembly")
        .displayField("internalTitle");
    chart
        .createField("internalTitle")
        .name("internal title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    chart
        .createField("title")
        .name("title")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false);

    chart
        .createField("slug")
        .name("slug")
        .type("Symbol")
        .localized(false)
        .required(true)
        .validations([{
            unique: true,
        }, ])
        .disabled(false)
        .omitted(false);

    chart
        .createField("tracks")
        .name("tracks")
        .type("Array")
        .localized(false)
        .required(false)
        .validations([{
            size: {
                min: 1,
            },

            message: "Please Add At least 4 Tracks to This Chart. It's a freaking Chart!",
        }, ])
        .disabled(false)
        .omitted(false)
        .items({
            type: "Link",

            validations: [{
                linkContentType: ["song"],
            }, ],

            linkType: "Entry",
        });

    chart
        .createField("image")
        .name("image")
        .type("Link")
        .localized(false)
        .required(true)
        .validations([{
            linkContentType: ["mediaWrapper"],
        }, ])
        .disabled(false)
        .omitted(false)
        .linkType("Entry");

    chart.changeFieldControl("internalTitle", "builtin", "singleLine", {});
    chart.changeFieldControl("title", "builtin", "singleLine", {});
    chart.changeFieldControl("slug", "builtin", "singleLine", {});
    chart.changeFieldControl("tracks", "builtin", "entryLinksEditor", {});
    chart.changeFieldControl("image", "builtin", "entryLinkEditor", {});
    const resource = migration
        .createContentType("resource")
        .name("resource")
        .description("")
        .displayField("key");
    resource
        .createField("key")
        .name("key")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    resource
        .createField("value")
        .name("value")
        .type("Text")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    resource.changeFieldControl("key", "builtin", "singleLine", {});
    resource.changeFieldControl("value", "builtin", "markdown", {});
    const mediaWrapper = migration
        .createContentType("mediaWrapper")
        .name("Media Wrapper")
        .description("")
        .displayField("internalTitle");
    mediaWrapper
        .createField("internalTitle")
        .name("Internal Title")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    mediaWrapper
        .createField("altText")
        .name("Alt Text")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    mediaWrapper
        .createField("description")
        .name("description")
        .type("Symbol")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false);
    mediaWrapper
        .createField("asset")
        .name("Asset")
        .type("Link")
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
        .linkType("Asset");
    mediaWrapper.changeFieldControl("internalTitle", "builtin", "singleLine", {});
    mediaWrapper.changeFieldControl("altText", "builtin", "singleLine", {});
    mediaWrapper.changeFieldControl("description", "builtin", "singleLine", {});
    mediaWrapper.changeFieldControl("asset", "builtin", "assetLinkEditor", {});
};