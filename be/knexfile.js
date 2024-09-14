module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: '1234',
            database: 'emora_test',
            port: 5432
        },
        migrations: {
            directory: './db/migrations' // Directory for migrations
        },
        seeds: {
            directory: './db/seeds' // Directory for seed files
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL, // Use environment variables in production
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    }
};
