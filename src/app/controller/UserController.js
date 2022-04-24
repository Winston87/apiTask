import * as Yup from 'yup';
import User from '../model/user';


import ValidarUser from '../exceptions/ExceptionsError';

class UserController {

    // resolver problema id caso existe email ja cadastrado
    async store(req, res) {

       ValidarUser.validarCaposSalvar(req, res);

        const user = await ValidarUser.verificarEmail(req,res);
        const userBody = req.body

        if (!user){
            const  { id , name, email }  = await User.create(userBody);

            return res.json({id, name, email});
        }

    }

    async update(req, res) {

        ValidarUser.validarCaposUpdate(req, res)

        const { email , oldPassword } = req.body;

        const userUpdate = await User.findByPk(req.userId);

        if(email !== userUpdate.email) {

            ValidarUser.verificarEmail(req,res);

        }

        ValidarUser.validarPassword(req, res);

        const { id , name } = await userUpdate.update(req.body);


        return res.json({id, name, email})
    }

}

export default new UserController();
