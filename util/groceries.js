const query = require("./query");

const Groceries = {
	getAll: function() {
		return query("SELECT * FROM list").then(function(res) {
			return res.rows;
		});
	},

	add: function(item) {
		return query("INSERT INTO list (name) VALUES ($1)", [item]);
	},
};

module.exports = Groceries;
