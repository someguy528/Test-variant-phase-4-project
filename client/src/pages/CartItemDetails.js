import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom"
import {useState} from "react"

function CartItemDetails({cart, onCartItemEdit, onCartItemDelete}){
    const history = useHistory()
    const {url} = useRouteMatch()
    const {cartItemId} = useParams()
    const cartItem = cart.cart_items.find(item => item.id === parseInt(cartItemId))
    
    const [quantity, setQuantity] = useState(cartItem.quantity)
    const [errors , setErrors] = useState([])
    function handleQuantityChange(e){
        setQuantity(parseInt(e.target.value))
    }
    const quantityOptions = [1,2,3,4,5,6,7,8,9,10].map(num => {
        return (<option key={num} value={num} > {num} </option>  )
    })

    function handleCartItemEditClick(){
        // fetch(`/api/${cart.id}/cart_items/${cartItemId}`,{
        fetch(`/api/carts/${cart.id}/cart_items/${cartItemId}`,{
            method: "PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({quantity: quantity})
        })
        .then(resp=>{
            if(resp.ok){
                resp.json().then(changedItem=>{
                    console.log(changedItem)
                    onCartItemEdit(changedItem)
                })
            }else{resp.json().then(error=>setErrors(error.errors))}
        })
    }
    function handleCartItemDeleteClick(){
        fetch(`/api/carts/${cart.id}/cart_items/${cartItemId}`,{
            method: "DELETE"
        }).then(resp=>{
            if(resp.ok){
                onCartItemDelete(cartItem)
                history.push(`${url.replace(`/${cart.id}/cart_items/${cartItemId}`,"")}`)
            }
        })
    }

    console.log(quantity)
    return (
    <section>
        <header>{cartItem.product.name}</header>
        Seller: {cartItem.product.seller.name}
        <p>Individual Price: ${cartItem.product.price}</p>
        <p>Quantity in Cart: {cartItem.quantity} </p>
        <p>Total Price: ${parseFloat(cartItem.product.price * cartItem.quantity).toFixed(2)} </p>
        <p>Change Quantity:</p>
        <select value={quantity} onChange={handleQuantityChange} >
            {quantityOptions}
        </select>
        <button onClick={handleCartItemEditClick} >Change</button>
        <p>Remove from Cart</p>
        <button onClick={handleCartItemDeleteClick} >Remove</button>
        {errors.map(error => {
                return (<header key={error} >{error}</header>)
            })}
        <p> <Link to={`${url.replace(`/${cart.id}/cart_items/${cartItemId}`,"")}`} >Go Back</Link>  </p>
    </section>
    )
}

export default CartItemDetails