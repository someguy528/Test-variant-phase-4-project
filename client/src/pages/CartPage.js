import { useContext, useEffect, useState } from "react"
import { Redirect, Route, Switch, useRouteMatch, useHistory } from "react-router-dom"
import { UserContext } from "../components/context/UserContext"
import CartItemListing from "../components/CartItemListing"
import CartItemDetails from "./CartItemDetails"

function CartPage({cart, setCart, fetchCartUser}){
    const history = useHistory()
    const {user} = useContext(UserContext)
    const {url} = useRouteMatch()

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
            price_total: parseFloat(parseFloat(cart.price_total) - (deletedItem.product.price * deletedItem.quantity )).toFixed(2),
            cart_items: cart.cart_items.filter(ci=> ci.id !== deletedItem.id )
        }
        setCart(newCart)
    }

    function handleCartDeleteClick(){
        fetch(`/api/carts/${cart.id}`,{
            method: "DELETE"
        }).then(resp=>{
            if(resp.ok){
                fetchCartUser()
                // history.push("/")
            }
        })
    }

    console.log(cart)
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
                    {cart.cart_items.length > 0 ? `Cart Total: $${cart.price_total}` : null }
                   
                </Route>
                <Route exact path={`${url}/:cartId/cart_items/:cartItemId`} >
                    <CartItemDetails cart={cart} onCartItemEdit={handleCartItemEdit} onCartItemDelete={handleCartItemDelete} />
                </Route>
            </Switch>
            
        </section>
    )
}

export default CartPage