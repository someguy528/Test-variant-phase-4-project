import { useContext, useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import { UserContext } from "../components/context/UserContext"

function ProductNew({onProductAdd}){
    const {user} = useContext(UserContext)
    const [errors , setErrors] = useState([])
    const history = useHistory()
    const {url} = useRouteMatch()
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "", 
        price: 0.00, 
        available: true
    })

    if(user === false){history.push(`${url.replace("/new","")}`)}

    function handleNewProductChange(e){
        let value = e.target.value
        setNewProduct({
            ...newProduct, 
            [e.target.name] : value
        })
    }

    function handleNewProductSubmit(e){
        e.preventDefault()
        const decPrice = Number(Math.round(parseFloat(newProduct.price+'e2'))+'e-2').toFixed(2);
        const formattedNewProduct = {
            ...newProduct,
            price: decPrice
        }
        fetch('/api/products',{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formattedNewProduct)
        }).then(resp=>{
            if(resp.ok){
                resp.json().then(p => {
                    if(!parseFloat(p.price[p.price.length-2])){
                        p.price = p.price + "0"}
                    onProductAdd(p);
                    history.push(`${url.replace("/new",`/${p.id}`)}`)
                })
            }else{
                resp.json().then(error => setErrors(error.errors))
            }
        })
    }

    return(
        <section>
            <h2>New Product</h2>
            <form onSubmit={handleNewProductSubmit} >
                <p>Name</p>
                <input type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} ></input>
                <p>Price</p>
                <input type="number" name="price" step="0.01" value={newProduct.price} onChange={handleNewProductChange} ></input>
                <p>Description</p>
                {/* <input type="text" name="description" value={newProduct.description} onChange={handleNewProductChange} ></input> */}
                <textarea type="text" name="description" value={newProduct.description} onChange={handleNewProductChange}
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

export default ProductNew