import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import DbMiddleware from "../../src/middlewares/DbMiddleware";
import User from "../../src/schema/User";
import errorList from '../../src/utils/errorList';
import { IUserProps } from '../../src/utils/interfaces';

export default DbMiddleware(async (req, res) => {
    if (req.method === 'POST') {
        let {email, password} = req.body;
        const user = await User.findOne({email}) as IUserProps;

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({_id: user._id, admin: !!user.admin}, process.env.JWT_SECRET, {expiresIn: '3d'});
    
                return res.status(200).json({token, admin: !!user.admin});
            }    
        }
        return res.status(400).json(errorList.LOGIN_INCORRETO);
    }
    return res.status(401).json(errorList.PERMISSAO_NEGADA);
});