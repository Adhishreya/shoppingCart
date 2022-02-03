import axios from "axios";
// export const productDetails = (id) => {
//     console.log("http://localhost:5000/products/" + id);
//     axios.get("http://localhost:5000/products/" + id).then(res => {
//         console.log(res.data);
//     });
// }
export const productDetails = (id) => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/products/" + id).then(res => {
            resolve(res.data);
        })
    })
}

// export const cartDetails = () => {
//     return new Promise((resolve, reject) => {
//         axios.get("http://localhost:5000/cart", { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => resolve(res));
//     })
// }


export const cartDetails = (navigate) => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:5000/cart", { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err.response);
            navigate("/error")
        });
    })
}