import axios from "axios";
export const loginRequest = ({username,password},navigate) => {
    // console.log(password+" "+username);
    localStorage.setItem("token",null);
    localStorage.setItem("user",null);

    axios.post("http://localhost:5000/users/signin",{username:username,password:password}).then(res => {
        // console.log(res.data);
        // if(res)
        localStorage.setItem("token",res.data.token);
        navigate("/")
        axios.get("http://localhost:5000/users/profile",{headers:{Authorization:'Bearer '+localStorage.getItem("token")}}).then(result=>{console.log(result.data[0].username);localStorage.setItem("user",result.data[0].username);})
    }).catch(err => console.log(err.response));
    // axios.post("http://localhost:5000/users/signin",{data:{username:username,password:password}}).then(res => {
    //     console.log(res.data);
    // });
    // fetch("http://localhost:5000/users/signin",{body:{username:username,password:password},method:"POST"}).then(res => {
    //     console.log(res.data);
    // });
}