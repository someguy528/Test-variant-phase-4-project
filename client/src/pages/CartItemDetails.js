import { useParams, Link, useRouteMatch } from "react-router-dom"
import {useState} from "react"

function CartItemDetails({cart}){

    const {url} = useRouteMatch()
    const {cartItemId} = useParams()
    const cartItem = cart.cart_items.find(item => item.id === parseInt(cartItemId))
    
    const [quantity, setQuantity] = useState(cartItem.quantity)
    function handleQuantityChange(e){
        setQuantity(parseInt(e.target.value))
    }
    const quantityOptions = [1,2,3,4,5,6,7,8,9,10].map(num => {
        return (<option key={num} value={num} > {num} </option>  )
    })
    console.log(quantity)
    return (
    <section>
        <header>{cartItem.product.name}</header>
        Seller: {cartItem.product.seller.name}
        <p>Price: ${cartItem.product.price}</p>
        <p>Quantity in Cart: {cartItem.quantity} </p>
        <p>Change Quantity:</p>
        <select value={quantity} onChange={handleQuantityChange} >
            {quantityOptions}
        </select>
        <button>Change</button>
        <p>Remove from Cart</p>
        <button>Remove</button>
        <p> <Link to={`${url.replace(`/${cartItemId}`,"")}`} >Go Back</Link>  </p>
    </section>
    )
}

export default CartItemDetails