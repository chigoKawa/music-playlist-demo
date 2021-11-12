// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const tools = require("../../lib/tool");
const _ = require("lodash");

export default function playlistAPI(req, res) {
    const method = req.method;

    let entryItems = tools.getChartEntries("playlist").then((entries) => {
        const entryItems = _.get(entries, "entryItems.items");
        const includes = _.get(entries, "entryItems.includes");
    });

    let entry = tools
        .getEntry("37cErEJJZIqhmJAl7Yf9I0")
        .then((entry) => {
            res.status(200).json({ entry });
        })
        .catch((getEntryError) => {
            console.log("getEntryError", getEntryError);
        });

    // res.status(200).json({ name: "John Doe" });
}