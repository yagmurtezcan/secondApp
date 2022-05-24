import {knex, Knex} from "knex"

class  KnexDB {
config: Knex.Config = {
    client: "pg",
    connection: "postgres://postgres:Aa!12@localhost:5432/secondapp",
    pool: {
        max: 7,
        min: 3,
    }
}
db = knex(this.config)

constructor() {
    console.log("Knex init started")
    this.databaseConfig();
}

init(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        const resultx = this.db.raw("select 1=1");
        console.log("result: " + resultx);
    })
}

databaseConfig(): void {
    console.log("Database config started")
}
}

const knexDB = new KnexDB();
export default knexDB;