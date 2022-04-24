import jwt from 'jsonwebtoken';
import { promisify } from 'util';// tranforma uma funcao em callback em uma assync auet
import authConfig from '../../config/auth';

export default async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authConfig) { // verifica se o toke, e valido

        return res.status(401).json({erro: 'Tokem nao existe '})
    }

    const [, token] = authHeader.split(' ');// manipulando o array para pegar so o tokem descartando o bearer

    try {

        const decoded = await promisify(jwt.verify)(token, authConfig.secret); // verifica o  secret buscando discriptografando e ver sem e igual o que agente mando e manda o payload como id entre outros

        req.userId = decoded.id;

        return next();// para nao travar apicaçao

    } catch (error) {
        return res.status(401).json({erro: 'Tokem  invalido '})
    }



}
