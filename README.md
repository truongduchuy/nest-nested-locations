# Installations

To start project, run: `docker compose up`. This will be required `docker` on your local.

If you installed a new npm package, run `docker compose up --build` to re-build the packages.

All location test cases have been implemented in `@/controllers/location.controller.spec.ts`. You can check the test cases by run: `yarn test`

If you want to look at the apis, the swagger has been installed on: [http://localhost:3000/api](http://localhost:3000/api).

# Accessing PostgreSQL server from PgAdmin

To connect to the PostgreSQL server from PgAdmin, we need to create a server object in PgAdmin with the details of the PostgreSQL server.

Here are the steps to create a server in PgAdmin:

1. Open PgAdmin in the web browser by visiting [http://localhost:5050](http://localhost:5050) (assuming we're using the default configuration in the `docker-compose.yml` file).
2. Log in using your email and password in the `docker-compose.yml` file for the `pgadmin` service.
3. In the left-hand sidebar, click **Servers** to expand the Servers menu.
4. Right-click on **Servers** and select **Register -> Server**.
5. In the **General** tab of the **Create - Server** dialog, we can give the server a name of our choice.
6. In the **Connection** tab, fill in the following details:
   - Host name/address: `db`
   - Port: `5432`
   - Maintenance database: `postgres`
   - Username: `postgres`
   - Password: `postgres`
7. Click **Save** to save the server configuration.
