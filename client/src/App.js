import './App.css';
import { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { UserContext } from './components/context/UserContext';


function App() {
  const {user} = useContext(UserContext)
  const [products,setProducts] = useState(null)
  const [cart,setCart] = useState(null)


  function fetchCartUser(){
    fetch("/api/carts/show")
    .then(resp=>{
        if(resp.ok){
        resp.json().then(data=>{
        const formatCartItemData = data.cart_items.map(ci=>{
            console.log(ci)
            if(!parseFloat(ci.product.price[ci.product.price.length-2])){
                ci.product.price = ci.product.price + "0"
                return ci
            }else return ci
        })
        data.cart_items = formatCartItemData
        setCart(data)})}
        else{setCart(false)}
    })
  }

  function handleCartItemAdd(newCartItem){
    if(cart.cart_items.some(ci=>ci.id === newCartItem.id)){
      const newCart = {
      ...cart,
      price_total: parseFloat(parseFloat(cart.price_total) + (newCartItem.product.price * (newCartItem.quantity - cart.cart_items.find(ci=>ci.id === newCartItem.id).quantity))).toFixed(2), 
      cart_items: cart.cart_items.map(ci=>{
        if(ci.id === newCartItem.id){
          return newCartItem
        }else return ci
      })
    }
    setCart(newCart)
    }
    else{const newCart = {
      ...cart,
      price_total: parseFloat(parseFloat(cart.price_total) + (newCartItem.product.price * newCartItem.quantity)).toFixed(2),
      cart_items: [...cart.cart_items , newCartItem ]
    }
    setCart(newCart)
  }
  }

  useEffect(()=>{
    fetchCartUser();
    fetch("/api/products")
        .then(resp=>resp.json())
        .then(productsData=>{
            const formatProductsData = productsData.map(p=>{
                if(!parseFloat(p.price[p.price.length-2])){
                    p.price = p.price + "0"
                    return p
                }else return p
            })
            setProducts(formatProductsData)
        })  
},[])

  if(!products || user === null || cart === null ){return(<h1 className='App-header' >Loading...</h1>)}

  return (
    <div className="App">

      <NavBar setCart={setCart} />
      <header className="App-header">
      <Switch>
        <Route exact path="/login" >
          <Login fetchCartUser={fetchCartUser} />
        </Route>
        <Route exact path="/new_user" >
          <NewUser fetchCartUser={fetchCartUser} />
        </Route>
        <Route path="/products" >
          <ProductsPage cart={cart} products={products} setProducts={setProducts} onCartItemAdd={handleCartItemAdd} />
        </Route>
        <Route path="/cart"  >
          <CartPage cart={cart} setCart={setCart} fetchCartUser={fetchCartUser} />
        </Route>
        <Route exact path="/" >
          <Home />
        </Route>
      </Switch>
      </header>
      
    </div>
  );
}

export default App;
