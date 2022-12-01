import { Model, DataTypes} from "sequelize";

export class User extends Model {}

export function init(sequelize) {
    User.init({
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
            sequelize,
            timestamps: false,
            modelName: 'User'
        });
}
