import { useContext, useState } from "react"
import { useHistory, useParams, useRouteMatch } from "react-router-dom"
import { UserContext } from "../components/context/UserContext"

function ProductEdit({products, onProductEdit}){
    const {url} = useRouteMatch()
    const history = useHistory()
    const {productId} = useParams()
    const {user} = useContext(UserContext)
    if(user === false){history.push(`${url.replace("/edit","")}`)}
    const product = products.find(p => p.id === parseInt(productId))
    const [editProduct, setEditProduct] = useState({
        name: product.name,
        description: product.description, 
        price: product.price, 
        available: product.available
    })
    const [errors , setErrors] = useState([])
    function handleEditProductChange(e){
        let value = e.target.value
        setEditProduct({
            ...editProduct, 
            [e.target.name] : value
        })
    }

    function handleNewProductSubmit(e){
        e.preventDefault()
        const decPrice = Number(Math.round(parseFloat(editProduct.price+'e2'))+'e-2').toFixed(2);
        console.log(decPrice)
        const formattedEditProduct = {
            ...editProduct,
            price: decPrice,
            available: Boolean(editProduct.available)
        }
        console.log(formattedEditProduct)
        fetch(`/api/products/${productId}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formattedEditProduct)
        }).then(resp=>{
            if(resp.ok){
                resp.json().then(p => {
                    if(!parseFloat(p.price[p.price.length-2])){
                            p.price = p.price + "0"}
                    onProductEdit(p);
                    history.push(`${url.replace("/edit","")}`)
                })
            }else{
                resp.json().then(error => setErrors(error.errors))
            }
        })
    }


    return (
        <section>
            <h2>Edit Product Details</h2>
            <form onSubmit={handleNewProductSubmit} >
                <p>Name</p>
                <input type="text" name="name" value={editProduct.name} onChange={handleEditProductChange} ></input>
                <p>Price</p>
                <input type="number" name="price" step="0.01" value={editProduct.price} onChange={handleEditProductChange} ></input>
                <p>Product Available?</p>
                <select name="available" value={editProduct.available} onChange={handleEditProductChange} >
                    <option value={true} >Yes</option>
                    <option value={""} >No</option>
                </select>
                <p>Description</p>
                <textarea type="text" name="description" value={editProduct.description} onChange={handleEditProductChange}
                rows="4" cols="40"
                ></textarea>
                <div></div>
                <button>Submit</button>
                {errors.map(error => {
                    return (<header key={error} >{error}</header>)
                })}

            </form>
        </section>
    )
}

export default ProductEdit