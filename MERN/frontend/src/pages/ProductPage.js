import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function ProductPage(props){
    const [product, setProduct] = useState("");
    const id = props.match.params.id;

    async function getProduct(){
        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        console.log(data.category)
    }

    useEffect(() => {
        getProduct();
    }, []);
    
    return (
        <>
            <div className="product-page">
                <div className="product-image">
                    <img src={product && product.image} alt="Test img" />
                </div>
                
                <div className="product-info">
                    <h3>{product && product.name}</h3>
                    {product && <h2>NGN  {product.price.toLocaleString()}</h2>}
                    <p>{product && product.description}</p>
                    {product.category && <p>Category:  {product.category.name}</p>}
                </div>
            </div>
        </>
    );
}