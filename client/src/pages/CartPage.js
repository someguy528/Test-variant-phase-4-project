import { useContext, useEffect, useState } from "react"
import { Redirect, Route, Switch, useRouteMatch, useHistory } from "react-router-dom"
import { UserContext } from "../components/context/UserContext"
import CartItemListing from "../components/CartItemListing"
import CartItemDetails from "./CartItemDetails"

function CartPage(){
    const history = useHistory()
    const {user} = useContext(UserContext)
    const {url} = useRouteMatch()
    const [cart,setCart] = useState(null)

    useEffect(()=>{
        fetch("/api/carts/show")
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            const formatCartItemData = data.cart_items.map(ci=>{
                console.log(ci)
                if(!parseFloat(ci.product.price[ci.product.price.length-2])){
                    ci.product.price = ci.product.price + "0"
                    return ci
                }else return ci
            })
            data.cart_items = formatCartItemData
            setCart(data)})
    },[])

    function handleCartItemEdit(changedItem){
        let newCart = {...cart,
            price_total: parseFloat(parseFloat(cart.price_total) + (changedItem.product.price * (changedItem.quantity - cart.cart_items.find(ci=>ci.id === changedItem.id).quantity))).toFixed(2), 

            cart_items: cart.cart_items.map(ci=>{
                    if(ci.id === changedItem.id ){
                        return changedItem
                    }else return ci
                })
        }
        setCart(newCart)
    }

    function handleCartItemDelete(deletedItem){
        let newCart = {
            ...cart,
            price_total: parseFloat(cart.price_total) - (deletedItem.product.price * deletedItem.quantity ).toFixed(2),
            cart_items: cart.cart_items.filter(ci=> ci.id !== deletedItem.id )
        }
        setCart(newCart)
    }

    function handleCartDeleteClick(){
        fetch(`/api/carts/${cart.id}`,{
            method: "DELETE"
        }).then(resp=>{
            if(resp.ok){
                history.push("/")
            }
        })
    }

    console.log(cart)
    if(user === null || cart === null){return(<h1>Loading...</h1>)}
    if(user === false){return <Redirect to="/login" />}

    const allCartItems = cart.cart_items.map(cartItem=> { return(
        <CartItemListing key={cartItem.id} cartItem={cartItem}  />
    )})

    return (
        <section>
            <Switch>
                
                <Route exact path={url} >
                    <h2>Cart page</h2>
                    <p><button onClick={handleCartDeleteClick} >Reset Cart</button></p>
                    {cart.cart_items.length > 0 ? "Cart Items:" : "You have no Cart Items!" }
                    {allCartItems}
                    Cart Total: ${cart.price_total}
                </Route>
                <Route exact path={`${url}/:cartItemId`} >
                    <CartItemDetails cart={cart} onCartItemEdit={handleCartItemEdit} onCartItemDelete={handleCartItemDelete} />
                </Route>
            </Switch>
            
        </section>
    )
}

export default CartPage