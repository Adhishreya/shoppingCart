import axios from "axios";
export const vendor = (id) =>{
    return new Promise((resolve,reject)=>{
        axios.get("http://localhost:5000/vendor/profile/"+id).then(res=>{
            resolve(res.data);
        })
    })
}