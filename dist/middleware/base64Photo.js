"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // to declare some path to store your converted image
    let matches = req.body;
    res = {};
    if (matches !== 3) {
        return new Error("invalid input string");
    }
    res.type = matches[1];
    res.data = new Buffer(matches[2], "base64");
    let decodedImg = res;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime_1.default.extension(type);
    let fileName = "image." + extension;
    try {
        fs_1.default.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
        return res.send({ "status": "success" });
    }
    catch (e) {
        next(e);
    }
});
exports.default = uploadImage;
//# sourceMappingURL=base64Photo.js.map