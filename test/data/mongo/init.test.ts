
import mongoose from 'mongoose';
import { MongoDatabase } from './../../../src/data/mongo/init';


describe('mongo init', () => {
    afterEach(() => {
        if (mongoose.connection.readyState === 1) {
        mongoose.connection.close();
}});

   test('should conection with mongo', async () => {

        const result =  await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!
            ,  dbName: process.env.MONGO_DB_NAME! 
        });
        expect(result).toBeTruthy();
        
    });

    test('should conection fail with mongo', async () => {
        try {
            const result = await MongoDatabase.connect({
                mongoUrl: process.env.MONGO_URL+'234'!
                , dbName: process.env.MONGO_DB_NAME!
            });
            expect(false).toBeTruthy();
        } catch (error) {
            expect(`${error}`).toContain('localhost:27017234');
        }

    })


})  