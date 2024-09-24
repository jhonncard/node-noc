import mongoose from "mongoose";
import { MongoDatabase } from "../../../../src/data/mongo/init";
import { LogModel } from "../../../../src/data/mongo/models/log-model";


describe('LogModel', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!
            , dbName: process.env.MONGO_DB_NAME!
        });
    })

    afterAll(async () => {
        await mongoose.connection.close();
    })

    test('should return a LogModel', async () => {

        const logData = {
            message: 'test-message',
            origin: 'log.odel.test.ts',
            level: 'low',
        }

        const log = await LogModel.create(logData);

        expect(log).toBeTruthy();
        expect(log.message).toEqual(logData.message);
        expect(log.origin).toEqual(logData.origin);
        expect(log.level).toEqual(logData.level);
        expect(log.createdAt).toEqual(expect.any(Date));
        expect(log.id).toEqual(expect.any(String));
        expect(log.__v).toEqual(expect.any(Number));

        await LogModel.findByIdAndDelete(log.id);
    });


    test('should return the schema Object', async () => {

        const schema = LogModel.schema.obj;

        expect(schema).toEqual(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function), required: true },
                level: {
                    type: expect.any(Function),
                    enum: ['low', 'medium', 'high'],
                    default: 'low'
                },
                createdAt: expect.any(Object),
            })
    })

})