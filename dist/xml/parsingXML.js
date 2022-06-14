"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var parser = require('xml2json');
const xmlReader = fs.readFile("./test.xml", function (err, data) {
    const xmlObj = parser.toJson(data, { reversible: true, object: true });
    console.log(xmlObj);
});
exports.default = xmlReader;
//# sourceMappingURL=parsingXML.js.map