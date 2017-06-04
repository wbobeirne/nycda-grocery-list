const Items = require("../models/items");

const Groceries = {
	getAll: function() {
		return Items.findAll();
	},

	add: function(item) {
		return Items.create({ name: item });
	},

	search: function(search) {
		return Items.findAll({
			where: {
				name: {
					$like: "%" + search + "%",
				},
			},
		});
	},
};

module.exports = Groceries;
