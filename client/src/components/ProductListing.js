import { useHistory, useRouteMatch } from "react-router-dom"

function ProductListing({product}){
    const history = useHistory()
    const {url} = useRouteMatch()
    const productClick = () => history.push(`${url}/${product.id}`)
    return(
        <section onClick={productClick} >
            <header>{product.name}  {`$${product.price}`} </header>
        </section>
    )
}

export default ProductListing