import jwt from 'jsonwebtoken'

const userAuth = async(req, res, next) =>{
    const authHeader = req.headers.authorization;
    // Support both the previous custom token header and the standard Bearer format.
    const token = req.headers.token || (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null);

    if(!token){
        return res.status(401).json({success: false, message: 'Not authorized. Login again'})
    }

    try{

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id)
        {
            req.userId = tokenDecode.id;
        }else{
            return res.status(401).json({success: false, message: 'Not authorized. Login again'}) 
        }

        next();

    }catch(error){
         res.status(401).json({success: false, message: 'Not authorized. Login again'}) 
    }
};

export default userAuth
