import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import AdminCategoriesPage from './pages/AdminCategoriespage';
import AddCategoryPage from './pages/AddCategoryPage';
import EditCategoryPage from './pages/EditCategoryPage';
import SearchResultPage from './pages/SearchResultPage';
import AdminDashboardPage from './pages/AdminDashboardPage';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      {/* <HomePage/> */}
      <Route path='/' exact component={HomePage}/>
      <Route path='/register' component={RegisterPage}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/admin-products' component={AdminProductsPage}/>
      <Route path='/add-product' component={AddProductPage}/>
      <Route path='/edit-product/:id' component={EditProductPage}/>
      <Route path='/product/:id' component={ProductPage}/>


      {/* <Route path='/cart' exact component={CartPage}/> */}
      <Route path='/cart/:id?' exact component={CartPage}/>
      {/* id is not necessary but it should exist */}
      <Route path='/checkout' exact component={CheckoutPage}/>
      <Route path='/order-history' component={OrderHistoryPage}/>
      <Route path='/admin-orders' component={AdminOrdersPage}/>
      <Route path="/order/:id" component={OrderDetailsPage}/>
      <Route path="/admin-categories" component={AdminCategoriesPage}/>
      <Route path="/add-category" component={AddCategoryPage}/>
      <Route path="/edit-category/:id" component={EditCategoryPage}/>
      <Route path="/search/:text" exact component={SearchResultPage}/>
      <Route path="/admin-dashboard" component={AdminDashboardPage}/>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
