export interface UserModel
{
    id:string,
    password:string,
    email:string,
    rememberme:boolean
}


export interface SignupModel
{
    id:string,
    firstname:string,
    lastname:string,
    fullname:string,
    password:string,
    confirmpassword:string,
    email:string
}
