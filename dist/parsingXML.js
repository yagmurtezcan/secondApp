"use strict";
var fs = require("fs");
var parser = require('xml2json');
const formatXml = require("xml-formatter");
fs.readFile("C:\\Users\\yagmur.tezcan\\Desktop\\secondApp\\data.xml", function (err, data) {
    const xmlObj = parser.toJson(data, { reversible: true, object: true });
    console.log(xmlObj);
    const foodItemsArray = xmlObj["breakfast_menu"]["food"];
    for (let i = 0; i < foodItemsArray.length; i++) {
        if (foodItemsArray[i].id === "3") {
            xmlObj["breakfast_menu"]["food"][i].name = "Belgian Waffles";
        }
    }
    const stringifiedXmlObj = JSON.stringify(xmlObj);
    const finalXml = parser.toXml(stringifiedXmlObj);
    fs.writeFile("C:\\Users\\yagmur.tezcan\\Desktop\\secondApp\\data.xml", formatXml(finalXml, { collapseContent: true }), function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("xml file succesfully updated");
        }
    });
});
//# sourceMappingURL=parsingXML.js.map