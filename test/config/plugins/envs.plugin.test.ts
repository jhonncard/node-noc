import { envs } from '../../../src/config/plugins/envs.plugin';


describe('envs plugin', () => {

    test('should return env options ', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'jhonncard@gmail.com',
            MAILER_SECRET_KEY: 'odkhsxdmfmxbuqsi',
            PROD: false,
            QA: false,
            DEV: false,
            MONGO_URL: 'mongodb://jhonny:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'jhonny',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC',
            POSTGRES_USER: 'postgres',
            POSTGRES_PASSWORD: '123456789',
            POSTGRES_DB: 'NOC_TEST' 
        });
    });


    test('should return eerror if not found env',async() => {
        jest.resetModules();

        process.env.PORT ='ascd';

        try {
            await import('../../../src/config/plugins/envs.plugin');

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

        

    });





});