import axios from "axios";
export const productDetails = (id) => {
    console.log("http://localhost:5000/products/" + id);
    axios.get("http://localhost:5000/products/" + id).then(res => {
        console.log(res.data);
    });
}