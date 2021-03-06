require("dotenv").config();
const exp = require("express");
const bodyParser = require("body-parser");
const app = exp();
const Groceries = require("./util/groceries");
const sql = require("./util/sql");

// Setup the public assets to live in the assets folder
app.use(exp.static("assets"));

// Set the default view engine to EJS, which means
// we don't have to specify ".ejs" in render paths
app.set("view engine", "ejs");

// Configure your app to correctly interpret POST
// request bodies. The urlencoded one handles HTML
// <form> POSTs. The json one handles jQuery POSTs.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


function renderGroceries(res, message) {
	Groceries.getAll().then(function(items) {
		res.render("list", {
			items: items,
			message: message,
		});
	});
}

app.get("/", function(req, res) {
	renderGroceries(res);
});

app.post("/", function(req, res) {
	Groceries.add(req.body.item).then(function() {
		renderGroceries(res, "Saved " + req.body.item);
	});
});

app.get("/search", function(req, res) {
	Groceries.search(req.query.search).then(function(items) {
		res.render("list", {
			items: items,
			message: "Showing results for '" + req.query.search + "'",
		});
	});
});


sql.sync().then(function() {
	console.log("Database synced");
	const port = process.env.PORT || 3000;

	app.listen(port, function() {
		console.log("Listening at http://localhost:" + port);
	});
});
