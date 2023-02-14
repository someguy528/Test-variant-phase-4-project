import { useContext, useState } from "react"
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom"
import { UserContext } from "../components/context/UserContext"

function ProductDetails({products, cart, onProductDelete, onCartItemAdd}){
    const history = useHistory()
    
    const [errors , setErrors] = useState([])
    const {url} = useRouteMatch()
    const {productId} = useParams()
    const {user} = useContext(UserContext)
    const product = products.find(p => p.id === parseInt(productId))
    const [cartItemQuantity, setCartItemQuantity] = useState("1")
    function handleDeleteClick(e){
        fetch(`/api/products/${productId}`,{
            method: "DELETE"
        }).then(resp=>{
            if(resp.ok){
                onProductDelete(product);
                history.push(`${url.replace(`/${productId}`,"")}`)
            }else{
                resp.json().then(error=>setErrors(error.errors))
            }
        })
    }
    function handleCartItemQuantityChange(e){
        setCartItemQuantity(e.target.value)
    }
    function handleCartItemAddClick(){
        fetch(`/api/carts/${cart.id}/cart_items`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                product_id : productId,
                quantity: parseInt(cartItemQuantity)
            })
        }).then(resp => {
            if(resp.ok){
                resp.json().then((data)=>{
                onCartItemAdd(data);
                console.log(data);
                history.push("/cart")})
            }else{
                resp.json().then(error=> setErrors(error.errors))
            }
        })
    }

    const quantity = [1,2,3,4,5,6,7,8,9,10].map(num => {
        return (<option key={num} value={num} > {num} </option>  )
    })


    let userIsSeller = null
    if(user !== false && product.seller.id === user.id){
        userIsSeller = (<div>
            <button onClick={handleDeleteClick} >Remove Listing</button> 
            <p> <Link to={`${url}/edit`} >Edit Product</Link>  </p>
        </div>)
    }


    let addToCartBtn = null
    if(user !== false){
        addToCartBtn = (<button onClick={handleCartItemAddClick} > Add To Cart </button>)
    }else{ addToCartBtn = ( <button>Login to add!</button> ) }

    let quantityAvailable = null
    if(product.available){
        quantityAvailable = (<div>
            <label>Select Quantity:</label>
            <select value={cartItemQuantity} onChange={handleCartItemQuantityChange} >{quantity}</select> 
            {addToCartBtn} </div>) 
    } else{quantityAvailable = (<p>"Unfortunately Unavailable!"</p>)}
    
    return(
        <section>
            <h2>{product.name}</h2>
            <header>Seller: {product.seller.name} ID# {product.seller.id} </header>
            <p>Price: ${product.price}</p>
            
            <p>Description: {product.description}</p>
            {quantityAvailable}
            {userIsSeller}
            <p> <Link to={`${url.replace(`/${productId}`,"")}`} >Go Back</Link>  </p>
            {errors.map(error => {
                return (<header key={error} >{error}</header>)
            })}
            
        </section>
    )
}

export default ProductDetails