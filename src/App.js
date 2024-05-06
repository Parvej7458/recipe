// import logo from './logo.svg';
import './App.css';
import Login from './Components/Assests/LoginForm/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Assests/LoginForm/Sidebar';
import Dashboard from './Components/Assests/LoginForm/Dashboard';
import Items from './Components/Assests/LoginForm/Items';
import Units from './Components/Assests/LoginForm/Units';
import Recipes from './Components/Assests/LoginForm/Recipes';
import RecipeItem from './Components/Assests/LoginForm/RecipeItem';
import Orders from './Components/Assests/LoginForm/Orders';
import OrderRecipe from './Components/Assests/LoginForm/OrderRecipe'; 

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
     
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<Dashboard/>}>
      <Route path='/admin/sidebar'element={<Sidebar/>}/>
      <Route path='/admin/items'element={<Items/>}/>
      <Route path='/admin/units'element={<Units/>}/>
      <Route path='/admin/recipes'element={<Recipes/>}/>
      <Route path='/admin/recipeitems/:id'element={<RecipeItem/>}/>
      <Route path='/admin/orders'element={<Orders/>}/>
      <Route path='/admin/orderrecipe' element={<OrderRecipe/>}/>
      </Route>
      <Route path='/logout' element={<Login/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
