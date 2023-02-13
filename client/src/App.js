import './App.css';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';


function App() {

  return (
    <div className="App">

      <NavBar />
      <header className="App-header">
      <Switch>
        <Route exact path="/login" >
          <Login />
        </Route>
        <Route exact path="/new_user" >
          <NewUser/>
        </Route>
        <Route path="/products" >
          <ProductsPage />
        </Route>
        <Route path="/cart">
          <CartPage/>
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
