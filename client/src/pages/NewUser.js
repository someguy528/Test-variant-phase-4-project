import { useState, useContext } from "react"
import { Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../components/context/UserContext"

function NewUser({fetchCartUser}){
    const {user, setUser} = useContext(UserContext);
    const [errors , setErrors] = useState([])
    const [newUser, setNewUser] = useState({
        username: "",
        name: "",
        password: "",
        password_confirmation: ""
    })
    const history = useHistory()
    
    function handleFormChange(e){
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }
    function handleNewUserSubmit(e){
        e.preventDefault();
        fetch("/api/users", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(resp =>{
            if(resp.ok){
                resp.json().then(data => {
                    setUser(data);
                    fetchCartUser()
                    console.log(data);
                    history.push("/")
                })
            } else{
                resp.json().then(error => setErrors(error.errors))
            }
        })
    }

    if(user !== false){return <Redirect to="/cart" />}

    return (
        <section>
            <h2>Create New User</h2>
            <form onSubmit={handleNewUserSubmit} >
                <header>Username</header>
                <input type="text" name="username" onChange={handleFormChange} value={newUser.username} />
                <header>Name</header>
                <input type="text" name="name" onChange={handleFormChange} value={newUser.name} />
                <header>Password</header>
                <input type="password" name="password" onChange={handleFormChange} value={newUser.password} />
                <header>Confirm Password</header>
                <input type="password" name="password_confirmation" onChange={handleFormChange} value={newUser.password_confirmation} />
                <div></div>
                <button type="submit">Create</button> 
                {errors.map(error => (
                    <header key={error} >{error}</header>
                ))}
            </form>
        </section>
    )
}
export default NewUser