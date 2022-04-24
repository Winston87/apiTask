
import Sequelize, { Model }  from 'sequelize';
import bcrypt from 'bcryptjs';
// classe user
class User extends Model {

    static init(sequelize) {// esse sequelize e a que recebe a conexao com o banco


        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING
            },
            {
                sequelize
            }
        );
        // criptografa a senha para salva no banco
        this.addHook('beforeSave', async user => {
            if(user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });



        return this;
    }


    checkPassword(password) {// verifica password digitado

        return bcrypt.compare(password, this.password_hash);//password_hash esta no banco de dados
    }
}


export default User;
