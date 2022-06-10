import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Page404 from "../components/errors/Page404";
import Page403 from "../components/errors/Page403";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import forgotPassword from "../components/frontend/auth/ForgotPassword";
import resetPassword from "../components/frontend/auth/resetPassword";
import ViewCategory from "../components/frontend/collections/ViewCategory";
import ViewProduct from "../components/frontend/collections/ViewProduct";
import ProductDetail from "../components/frontend/collections/ProductDetail";
import Content from "../layouts/frontend/Content";
import Cart from "../components/frontend/Cart";
import Wishlist from "../components/frontend/Wishlist";
import Checkout from "../components/frontend/Checkout";
import Profile from "../components/frontend/Profile";
import Myorders from "../components/frontend/Myorders";
import Help from "../components/frontend/Help";
import Comment from "../components/frontend/Comment";
import Search from "../components/frontend/Search";
const PublicRoutelist = [
  { path: "/", exact: true, name: "Home", component: Content },
  { path: "/about", exact: true, name: "About", component: About },
  { path: "/contact", exact: true, name: "Contact", component: Contact },
  { path: "/403", exact: true, name: "Page403", component: Page403 },
  { path: "/404", exact: true, name: "page404", component: Page404 },
  { path: "/login", exact: true, name: "Login", component: Login },

  {
    path: "/forgotPassword",
    exact: true,
    name: "forgotPassword",
    component: forgotPassword,
  },
  {
    path: "/resetPassword",
    exact: true,
    name: "resetPassword",
    component: resetPassword,
  },
  { path: "/register", exact: true, name: "Register", component: Register },
  { path: "/orders", exact: true, name: "Myorders", component: Myorders },
  { path: "/help", exact: true, name: "Help", component: Help },
  {
    path: "/search/:key",
    exact: true,
    name: "Search",
    component: Search,
  },
  {
    path: "/collections",
    exact: true,
    name: "ViewCategory",
    component: ViewCategory,
  },
  {
    path: "/collections/:slug",
    exact: true,
    name: "ViewProduct",
    component: ViewProduct,
  },
  {
    path: "/collections/:category/:product",
    exact: true,
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/collections/:category/:product/:id/comment",
    exact: true,
    name: "Comment",
    component: Comment,
  },
  {
    path: "/cart",
    exact: true,
    name: "Cart",
    component: Cart,
  },
  {
    path: "/wishlist",
    exact: true,
    name: "Wishlist",
    component: Wishlist,
  },
  {
    path: "/checkout",
    exact: true,
    name: "Checkout",
    component: Checkout,
  },
  { path: "/profile", exact: true, name: "Profile", component: Profile },
];
export default PublicRoutelist;
