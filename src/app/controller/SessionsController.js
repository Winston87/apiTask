import jwt from 'jsonwebtoken';
import ValidarEmail from '../exceptions/ExceptionsError';

import aurhConfig from '../../config/auth';


class sessionController {

    async store (req, res) {

        const user = await ValidarEmail.verificarUser(req, res);

        const {id , name , email } = user;

        return res.json({
            user: {
                id, name, email
            },
            token: jwt.sign({ id }, aurhConfig.secret, {

                expiresIn: aurhConfig.expiresIn,
            }),

        });

    }


}


export default new sessionController();
