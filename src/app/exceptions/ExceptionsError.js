
import * as Yup from 'yup';


import User from '../model/user';

class ExceptionsMenseger {

    async verificarEmail(req , res) { // validar email existe no banco

        const userExist = await User.findOne({
            where: { email: req.body.email }
        });

        if( userExist ) {
            return res.status(401).json({Erro: 'Email ja existente.'})
        }

        return userExist;

    }


    async verificarUser(req , res) {// sessao logout validar senha e email

        const userExist = await User.findOne({
            where: { email: req.body.email}
        });

        if( !userExist ) {
            return res.status(401).json({Erro: 'Email nao existente.'})

        }

        const { password } = req.body;

        if (!(await userExist.checkPassword(password))){

            return res.status(401).json({Erro: 'Senha invalida.'})
        }

        return userExist;

    }

    async validarPassword(req, res) { // validar senha atual

        const { oldPassword } = req.body;
        const usersId = await User.findByPk(req.userId);

        if(oldPassword && !(await usersId.checkPassword(oldPassword))){

            return res.status(401).json({error: 'senha invalida'})
         }
    }


    async validarCaposSalvar(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({erro: ' campos em branco'})
        }
    }


    async validarCaposUpdate(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>

                oldPassword ? field.required() : field
            ),
            confirPassword: Yup.string().min(6).when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        });

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({erro: ' campos invalido atualizar'})
        }
    }

    async validarCaposTask(req, res) {

        const schema = Yup.object().shape({
            task: Yup.string().required(),

        });

        if(!(await schema.isValid(req.body))){

            return res.status(400).json({erro: ' campos em branco'})
        }
    }




    async verificarUserTask(valid, res) {

        if(!valid){

            return res.status(400).json({erro: 'tarefa nao existe para este usuario'})
        }
    }

    async verificarUserId(valid, verif,  res) {

        if(valid !== verif){

            return res.status(400).json({erro: 'Usuario nao permitido a excluir'})
        }
    }




}




export default new ExceptionsMenseger();
