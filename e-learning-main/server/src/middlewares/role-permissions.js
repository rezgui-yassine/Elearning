const ROLES ={
    ADMIN: 'ADMIN',
    STUDENT: 'STUDENT',
    FORMATEUR: 'FORMATEUR'
};

const rolePermissions = 
    (...roles)=>(req,res,next)=>{
        const role = roles.find((role)=>req.user.role.indexOf(role) != -1);
        if(!role) return res.status(403).json({message: "you are not authorized"});
        next();
    };

    module.exports = {rolePermissions, ROLES};
