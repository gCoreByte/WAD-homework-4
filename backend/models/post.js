const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("Post", {
            body: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            updatedAt: false
        });
};