module.exports=(...role)=>{ 
    return (req,res,next)=>{
        const userRole = req.user?.role
        if(!role.includes(userRole)){
            return res.status(401).json({
                success:false,
                message:"forbidden access you are not admin or store-manager"
            })
        }
        next()

    }
}