import Sequelize, { Model } from 'sequelize';

class Task extends Model {

    static init(sequelize) {

        super.init(
            {
                task: Sequelize.STRING,
                check: Sequelize.STRING
            },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models) { // associacao entre tabela 1 para 1

        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'} );
    }
}


export default Task;
