import axios from "axios";

const url = "http://localhost:5000/";

export const fetchAllProducts = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}products`).then(res => {
            resolve(res.data)
        });
    })
}

export const productDetails = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}products/${id}`).then(res => {
            resolve(res.data);
        })
    })
}

export const tagsDetails = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}tags`).then(res => {
            resolve(res.data);
        })
    })
}


export const getCategories = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}categories`).then(res => {
            resolve(res.data);
        })
    })
}

export const discountDetails = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}discount`).then(res => {
            resolve(res.data);
        })
    })
}

export const sellProduct = (productDetails) => {
    console.log(productDetails);
    return new Promise((resolve, reject) => {
        axios.post(`${url}products/`, { productDetails: productDetails }, { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(result => {
            // console.log(result)
            resolve(result)
        })
    })
}


export const getProductByCategory = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}products/category/${id}`).then(res => {
            conosole.log(res.data);
            resolve(res.data);
        })
    })
}

export const getProductByTag = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}products/tags/${id}`).then(res => {
            resolve(res.data);
        })
    })
}

export const getProductByDiscount = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}products/discount/${id}`).then(res => {
            resolve(res.data);
        })
    })
}

export const filterProducts = (customUrl) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}products/filter${customUrl}`).then(res => {
            resolve(res.data);
        })
    })
}

// const tage = ["Refurbished","New","Used","Damaged","Discontinued","Refurbished","NewArivals","Used","Damaged","Discontinued"];
// export const cartDetails = () => {
//     return new Promise((resolve, reject) => {
//         axios.get("http://localhost:5000/cart", { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => resolve(res));
//     })
// }


export const cartDetails = (navigate) => {
    return new Promise((resolve, reject) => {
        axios.get(`${url}cart`, { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err.response);
            navigate("/error")
        });
    })
}

export const increment = (id, navigate) => {
    return new Promise((resolve, reject) => {
        axios.post(`${url}cart/increment/${id}`, null, { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err.response);
            navigate("/error")
        });
    })
}


export const decrement = (id, navigate) => {
    return new Promise((resolve, reject) => {
        axios.post(`${url}cart/decrement/${id}`, { orderId: id }, { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(err.response);
            navigate("/error")
        });
    })
}

export const deleteCartItem = (id, navigate) => {
    // return new Promise((resolve, reject) => {
    //     axios.delete("http://localhost:5000/cart/delete/" + id, { orderId: id }, { headers: { Authorization: "bearer " + localStorage.getItem("token") } }).then(res => {
    //         resolve(res)
    //     }).catch(err => {
    //         console.log(err.response);
    //         navigate("/error")
    //     });
    // })

    // let { data } = axios({
    //     url: "http://localhost:5000/cart/delete/" + id,
    //     method: 'delete',
    //     data: { orderId: id },
    //     headers: { Authorization: "bearer " + localStorage.getItem("token") }
    // });

    // return data;

    return new Promise((resolve, reject) => {
        axios({
            url: "http://localhost:5000/cart/delete/" + id,
            method: 'delete',
            data: { orderId: id },
            headers: { Authorization: "bearer " + localStorage.getItem("token") }
        }).then(res => {
            resolve(res.data);
        })
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