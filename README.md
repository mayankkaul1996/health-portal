# Health backend API service

Primary API Service for [Health](www.Health.com).

---

## Installation

```bash
$ git clone
$ cd health-backend
$ yarn install
```

## Configuring the environment

The environment variables required for the app to run are listed in [.env.example](.env.example).

The project contains a [.env.defaults](.env.defaults) file that contains meaningful default values for the env. You should be able to run the project using these values.

*NOTE*: In case you need to overwrite any value, create a file with the name `.env` and fill in the appropriate `key=value`.

## Setting up the database

The application uses PostgreSQL as it's primary database.
1. Ensure that you have a local instance of PostgreSQL running. Instructions to download and install a PostgreSQL server can be found [here](https://www.postgresql.org/download/).
2. The default username/password for PostgreSQL is `postgres`/`root`. If you have changed these credentials, or any other defaults (like port), ensure that you update the same in `.env`.
3. Run the file [db-setup.sql](db-setup.sql) on your PostgreSQL installation. You can run it using `psql`: `psql -U <DB_USER> -d <DB_NAME> -a -f db-setup.sql`, or you can copy the commands from the file and run them using your preferred PostgreSQL client.

## Running the database migrations

The migrations helps us to create the initial tables in database and seed the initial data into the tables (if any).
We are using db-migrate to handle the database migrations. You can track the documentation [here](https://db-migrate.readthedocs.io/en/latest/).

To run the migrations use the command:

```
yarn migration:up
```

In the same fashion, to undo a migration run:

```
yarn migration:down
```

For any update on the relation structure or new seed data, prefer writing the migration for it so that the db structure stays in sync on all environments. To create a new migration use the following command:

```
yarn migration:create [migation-name]
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Using the service
The service APIs will be accessible via port `3004`, unless otherwise overriden using the `PORT` key in env.