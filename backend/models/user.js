const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("User", {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            timestamps: false,
        });
};