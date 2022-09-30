import axios from "axios";

const url = "http://localhost:5000/";

export const getOrderItems  = async (id) =>{
    const orderItems = await axios.get(`${url}orders/items/${id}`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}});
    console.log(orderItems.data);
    return orderItems.data;
}

export const getInTransitOrderItems  = async (id) =>{
    const orderItems = await axios.get(`${url}orders/items`,{headers:{Authorization:"bearer "+localStorage.getItem("token")}});
    return orderItems.data;
}