import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function AdminDashboardPage(){
    const [products, setProducts] = useState("");
    const [users, setUsers] = useState("");
    const [categories, setCategories] = useState("");
    const [orders, setOrders] = useState("");

    // const [info, setInfo] = useState("");


    async function getDashboardInfo(){
        const {data} = await axios.get("http://localhost:5000/api/dashboard/info");
        setProducts(data.products);       
        setUsers(data.users);       
        setCategories(data.categories);       
        setOrders(data.orders);     

        // setInfo(data);
    }
    
    useEffect(() => {
        getDashboardInfo();
    },[]);

    return (
        <>
        <div className="container">
        <div className="dashboard">
            <div className="dashboard-item">
                <i className="fa fa-shopping-cart"></i>
                <h1>{products}</h1>
                <h3>Products</h3>
            </div>
            <div className="dashboard-item">
                <i className="fa fa-users"></i>
                <h1>{users}</h1>
                <h3>Users</h3>
            </div>
            <div className="dashboard-item">
                <i className="fa fa-list"></i>
                <h1>{categories}</h1>
                <h3>Categories</h3>
            </div>
            <div className="dashboard-item">
                <i className="fa fa-clipboard"></i>
                <h1>{orders}</h1>
                <h3>Orders</h3>
            </div>
            <div className="dashboard-item">
                <i className="fa fa-comment"></i>
                <h1>-</h1>
                <h3>Messages</h3>
            </div>
            <div className="dashboard-item">
                <i className="fa fa-money-bill"></i>
                <h1>-</h1>
                <h3>Sales</h3>
            </div>
        </div></div>
        
        </>
    );
}