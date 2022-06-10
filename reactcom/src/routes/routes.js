import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import Category from "../components/admin/category/Category";
import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";
import AddProduct from "../components/admin/product/AddProduct";
import AddProductDescripiton from "../components/admin/product/AddProductDescripiton";
import ViewProduct from "../components/admin/product/ViewProduct";
import EditProduct from "../components/admin/product/EditProduct";
import EditProductDescription from "../components/admin/product/EditProductDescription";
import Order from "../components/admin/order/Order";
import User from "../components/admin/user/User";
import Contact from "../components/admin/contact/Contact";
import Setting from "../components/admin/Setting/setting";
import editSetting from "../components/admin/Setting/editSetting";
import viewSetting from "../components/admin/Setting/viewSetting";
import AddLanguage from "../components/admin/AddLanguage/AddLanguage";
import ViewLanguage from "../components/admin/AddLanguage/ViewLanguage";

const routes = [
  { path: "/admin", exact: true, name: "Admin" },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/add-category",
    exact: true,
    name: "Category",
    component: Category,
  },
  {
    path: "/admin/view-category",
    exact: true,
    name: "View-Category",
    component: ViewCategory,
  },
  {
    path: "/admin/edit-category/:id",
    exact: true,
    name: "EditCategory",
    component: EditCategory,
  },
  {
    path: "/admin/add-product",
    exact: true,
    name: "AddProduct",
    component: AddProduct,
  },

  {
    path: "/admin/add-product-description",
    exact: true,
    name: "AddProductDescripiton",
    component: AddProductDescripiton,
  },
  {
    path: "/admin/view-product",
    exact: true,
    name: "ViewProduct",
    component: ViewProduct,
  },
  {
    path: "/admin/edit-product/:id",
    exact: true,
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/admin/edit-product-description/:id",
    exact: true,
    name: "EditProductDescription",
    component: EditProductDescription,
  },
  { path: "/admin/profile", exact: true, name: "Profile", component: Profile },
  { path: "/admin/orders", exact: true, name: "order", component: Order },

  { path: "/admin/users", exact: true, name: "user", component: User },
  { path: "/admin/contact", exact: true, name: "contact", component: Contact },
  { path: "/admin/setting", exact: true, name: "setting", component: Setting },
  {
    path: "/admin/edit-setting/:id",
    exact: true,
    name: "editSetting",
    component: editSetting,
  },
  {
    path: "/admin/view-setting",
    exact: true,
    name: "viewSetting",
    component: viewSetting,
  },
  {
    path: "/admin/add-language",
    exact: true,
    name: "language",
    component: AddLanguage,
  },
  {
    path: "/admin/view-language",
    exact: true,
    name: "View-Language",
    component: ViewLanguage,
  },
];
export default routes;
