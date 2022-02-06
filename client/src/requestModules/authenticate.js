import axios from "axios";
import { cartDetails } from '../requestModules/products'
export const loginRequest = ({ username, password }, navigate, setCount) => {

    var quantity = 0;

    axios.post("http://localhost:5000/users/signin", { username: username, password: password }).then(res => {
        localStorage.setItem("token", res.data.token);
        navigate("/")
        console.log(res)
        axios.get("http://localhost:5000/users/profile", { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }).then(result => {
            console.log(result.data[0].username);
            localStorage.setItem("user", result.data[0].username);
            cartDetails(navigate).then(res => {
                if (res.data !== null) {
                    // setCartData(res.data);
                    res.data[0].products.forEach(element => {
                        quantity += element.quantity;
                    });
                    setCount(quantity);
                }
            })
        })
    }).catch(err => { console.log(err.response); navigate("/error") });

}

export const signupRequest = ({ username, password, email, phone }, navigate) => {
    console.log(username, password, email, phone)
    axios.post("http://localhost:5000/users/signup", { username: username, password: password, email: email, phoneNumber: phone }).then(res => {
        console.log(res.status)
        if (res.status === 200) {
            console.log(res.data)
            localStorage.setItem("token", res.data.token);
            navigate("/")
            axios.get("http://localhost:5000/users/profile", { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }).then(result => { console.log(result.data[0].username); localStorage.setItem("user", result.data[0].username); })
        }
    }).catch(err => { console.log(err.response); navigate("/error") });
};


// export const profileDetails = ()=>{
//     axios.get("http://localhost:5000/users/profile",{headers:{Authorization:'Bearer '+localStorage.getItem("token")}}).then(result=>{console.log(result.data[0].username);localStorage.setItem("user",result.data[0].username);})
// }

export const uploadImage = (image, navigate) => {
    console.log(image.data)
    const data = new FormData();
    data.append("image", image, "" + image.name + "")
    // const data = {"image":image};
    console.log(data)
    axios.post("http://localhost:5000/users/uploadProfilePicture", data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } }).then(res => { console.log(res.data); if (res.data) { navigate("/profile") } }, err => { console.log(err.response); navigate("/error") })
}