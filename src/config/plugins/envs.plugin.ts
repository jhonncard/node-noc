import 'dotenv/config';
import * as env from 'env-var';



export const envs = {
    PORT: env.get('PORT').default(3000).required().asPortNumber(),
    MAILER_IMAIL: env.get('MAILER_IMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    PROD:env.get('PROD').required().asBool(),
    QA:env.get('PROD').required().asBool(),
    DEV:env.get('PROD').asBool(),
}