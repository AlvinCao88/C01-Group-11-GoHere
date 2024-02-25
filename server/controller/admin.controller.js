import dbConfig from "../config/db.config.js";
import bcrypt from "bcrypt";

const userCollection = dbConfig.instance.collection(dbConfig.collections.ADMINS);

class AdminController{


    static async getUser (email) {
        const existingUser = await userCollection.findOne({ email });
        return existingUser;
    }

    static async createUser (email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userCollection.insertOne({
          email,
          password: hashedPassword,
        });
    }
    

}

export default AdminController;