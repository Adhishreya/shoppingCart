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

export const increment = (id, navigate) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:5000/cart/increment/" + id,null, { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err.response);
            navigate("/error")
        });
    })
}


export const decrement = (id, navigate) => {
    console.log(id)
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:5000/cart/decrement", { orderId: id }, { headers: { Authentication: "bearer " + localStorage.getItem("token") } }).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err.response);
            navigate("/error")
        });
    })
}

export const localItems = () => {

    var itemC = 0;
    var itemRaw = localStorage.getItem("cartDetails");

    if (itemRaw != null) {
        var items = JSON.parse(itemRaw);

        items.forEach(element => {
            itemC += element.quantity;
        });
    }

    return itemC;
}