import axios from "axios";
export const loginRequest = ({username,password}) => {
    console.log(password+" "+username);
    axios.post("http://localhost:5000/users/signin",{username:username,password:password}).then(res => {
        console.log(res.data);
    });
    // axios.post("http://localhost:5000/users/signin",{data:{username:username,password:password}}).then(res => {
    //     console.log(res.data);
    // });
    // fetch("http://localhost:5000/users/signin",{body:{username:username,password:password},method:"POST"}).then(res => {
    //     console.log(res.data);
    // });
}