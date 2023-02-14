import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useHistory } from "react-router-dom";

function NavBar({setCart}){
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()
    function handleLogout(){
        fetch("/api/logout",{
            method: "DELETE",
        }).then(()=> {
                    setUser(false);
                    setCart(false);
                    history.push("/");  
                    // needs reload on logout to prevent product page related page loading freeze
                    // window.location.reload(true)
                      
            }
        )
    }
    

    if(!user)return(
        <section>
        <NavLink to="/" > Home </NavLink>
        <NavLink to="/products" >Products</NavLink>
        <NavLink to="/login" > Login </NavLink>
        <NavLink to="/new_user"> New User </NavLink>
        </section>
    )
    return (
        <section>
        <NavLink to="/" > Home </NavLink>
        <NavLink to="/products" >Products</NavLink>
        <NavLink to="/cart" >Cart</NavLink>
        {/* <NavLink to="/account" > Account </NavLink> */}
        <button onClick={handleLogout}> Logout </button>
        </section>
    )
}

export default NavBar