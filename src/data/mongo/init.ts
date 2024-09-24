import mongoose from "mongoose";
interface ConnectionOptionns {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options : ConnectionOptionns) {

        const { mongoUrl, dbName } = options;
        try {
            await
            mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            //console.log('MongoDB connected');

            return true;
        } catch (error) {
           // console.log('Error connecting to mongo', error);
            throw  error ;
        }
    }
}