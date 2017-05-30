const pg = require("pg");

// Create the config object
const config = {
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 5432,
};

// Create the shared pool object
const pool = new pg.Pool(config);

// Add a little handler for general database errors. This
// won't trigger on individual query errors, but will handle
// things like if the database we try to connect to isn't
// available, our database runs out of room etc.
pool.on("error", function(err) {
	console.error("Postgres query pool encountered an error", err);
});

// Export a simple function that just runs a query using our pool
module.exports = function(queryString, values, cb) {
	return pool.query(queryString, values, cb);
};
