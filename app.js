require("dotenv").config();
const exp = require("express");
const bodyParser = require("body-parser");
const app = exp();
const query = require("./util/query");

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


app.get("/", function(req, res) {
	// res.send("Hello!");
	query("SELECT * FROM list").then(function(result) {
		res.json(result);
	});
});


const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log("Listening at http://localhost:" + port);
});
