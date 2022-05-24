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
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
class KnexDB {
    constructor() {
        this.config = {
            client: "pg",
            connection: "postgres://postgres:Aa!12@localhost:5432/secondapp",
            pool: {
                max: 7,
                min: 3,
            }
        };
        this.db = (0, knex_1.knex)(this.config);
        console.log("Knex init started");
        this.databaseConfig();
    }
    init() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const resultx = this.db.raw("select 1=1");
            console.log("result: " + resultx);
        }));
    }
    databaseConfig() {
        console.log("Database config started");
    }
}
const knexDB = new KnexDB();
exports.default = knexDB;
//# sourceMappingURL=knex.js.map