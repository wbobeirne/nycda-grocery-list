const sql = require("../util/sql");
const Sequelize = require("sequelize");

module.exports = sql.define("item", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING(100),
		notNull: true,
	},
});
