import dotenv from "dotenv"

dotenv.config()

class Config {
    secret_key: string

    constructor() {
        this.secret_key = process.env.SECRET_KEY || ""
    }
}

const config = new Config()
export default config