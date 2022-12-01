import { Model, DataTypes} from "sequelize";

export class Post extends Model {}

export function init(sequelize) {
    Post.init(
        {
            body: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            updatedAt: false,
            modelName: 'Post'
        });
}