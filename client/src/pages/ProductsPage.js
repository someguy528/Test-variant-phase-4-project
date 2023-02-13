import { useContext, useEffect, useState } from "react"
import ProductListing from "../components/ProductListing"
import ProductDetails from "./ProductDetails";
import ProductNew from "./ProductNew";
import ProductEdit from "./ProductEdit";
import {Switch, Route, useRouteMatch, Link} from "react-router-dom";
import { UserContext } from "../components/context/UserContext";

function ProductsPage(){
    const {user} = useContext(UserContext)
    const {url} = useRouteMatch()
    const [products,setProducts] = useState(null)
    
    useEffect(()=>{
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
    if(!products || user === null){return(<h1>Loading...</h1>)}

    function handleProductAdd(newProduct){
        const newProducts = [...products, newProduct]
        setProducts(newProducts)
    }
    function handleProductEdit(editProduct){
        const newProducts = products.map(p=>{
            if(p.id===editProduct.id){
                return editProduct
            }
            else return p
        })
        setProducts(newProducts)
    }
    function handleProductDelete(deletedProduct){
        const newProducts = products.filter(p=>p.id !== deletedProduct.id)
        setProducts(newProducts)
    }

    const allProducts = products.map(p =>{
        return (<ProductListing product={p} key={p.id} />)
    })

    console.log(products)

    return(
        <section>
            
            <Switch>
                
                <Route exact path={url} >
                    <h2> Products </h2>
                    {user !== false ? <Link to={`${url}/new`} >Add Product</Link> : null }
                    {allProducts}
                </Route>
                <Route exact path={`${url}/new`} >
                    <ProductNew onProductAdd={handleProductAdd} />
                </Route>
                <Route exact path={`${url}/:productId/edit`} >
                    <ProductEdit products={products} onProductEdit={handleProductEdit} />
                </Route>
                <Route exact path={`${url}/:productId`} >
                    <ProductDetails products={products} onProductDelete={handleProductDelete} />
                </Route>
            </Switch>
            
        </section>
    )
}
export default ProductsPage