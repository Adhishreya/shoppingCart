import axios from "axios";
export const loginRequest = ({username,password},navigate) => {
    axios.post("http://localhost:5000/users/signin",{username:username,password:password}).then(res => {
        localStorage.setItem("token",res.data.token);
        navigate("/")
        axios.get("http://localhost:5000/users/profile",{headers:{Authorization:'Bearer '+localStorage.getItem("token")}}).then(result=>{console.log(result.data[0].username);localStorage.setItem("user",result.data[0].username);})
    }).catch(err => console.log(err.response));

}

export const signupRequest = ({username,password,email,phone},navigate) => {
    console.log(username,password,email,phone)
    axios.post("http://localhost:5000/users/signup",{username:username,password:password,email:email,phoneNumber:phone}).then(res => {
        console.log(res.status)    
    if(res.status === 200){
    console.log(res.data)    
    localStorage.setItem("token",res.data.token);
        navigate("/")
        axios.get("http://localhost:5000/users/profile",{headers:{Authorization:'Bearer '+localStorage.getItem("token")}}).then(result=>{console.log(result.data[0].username);localStorage.setItem("user",result.data[0].username);})
    }
    }).catch(err => console.log(err));
};
