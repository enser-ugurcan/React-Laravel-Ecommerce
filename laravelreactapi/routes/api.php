<?php

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facedes\RateLimit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\WishlistController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FrontUserController;
use App\Http\Controllers\API\ForgotController;
use App\Http\Controllers\API\ContactController;



Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::post('contact', [FrontendController::class,'contact']);
Route::get('getCategory', [FrontendController::class,'category']);
Route::get('orders', [FrontendController::class,'orders']);
Route::get('fetchproducts/{slug}', [FrontendController::class,'product']);
Route::get('viewproductdetails/{category_slug}/{product_name}', [FrontendController::class,'viewproduct']);
Route::post('add-to-cart' ,[CartController::class, 'addtoCart']);
Route::get('cart' ,[CartController::class, 'viewcart']);
Route::put('cart-updatequntity/{cart_id}/{scope}',[CartController::class, 'updatequantity']);
Route::delete('delete-cartitem/{cart_id}',[CartController::class, 'deleteCartitem']);
Route::post('add-to-wishlist',[WishlistController::class, 'addtoWishlist']);
Route::get('wishlist' ,[WishlistController::class, 'wishlistcart']);
Route::delete('delete-wishlistitem/{wishlist_id}',[WishlistController::class, 'deletewishlistcart']);

Route::get('userprofile',[FrontUserController::class , 'profile']);
Route::post('update-user',[FrontUserController::class , 'update']);
  

Route::post('forgot' , [ForgotController::class, 'forgot']);
Route::post('reset' , [ForgotController::class, 'reset']);


Route::post('place-order',[CheckoutController::class,'placeorder']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function(){

    Route::get('/checkingAuthenticated', function(){
        return response()->json(['message'=>'You are in', 'status'=>200],200);
    });

    
    //Category
    Route::get('view-category', [CategoryController::class , 'index']);
    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}',[CategoryController::class, 'update']);
    Route::delete('delete-category/{id}',[CategoryController::class, 'delete']);
    Route::get('all-category', [CategoryController::class, 'allCategory']);

    //Orders
    Route::get('admin/orders',[OrderController::class,'index']);
    //Users
    Route::get('admin/users',[UserController::class,'index']);
    //Contacs
    Route::get('admin/contact',[ContactController::class,'index']);

    
    //Product
    Route::post('store-product',[ProductController::class,'store']);
    Route::get('view-product',[ProductController::class,'index']);
    Route::get('edit-product/{id}',[ProductController::class,'edit']);
    Route::post('update-product/{id}',[ProductController::class,'update']);

});

Route::middleware(['auth:sanctum'])->group(function(){

    Route::post('logout',[AuthController::class,'logout']);
});

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    
 //   return $request->user();
//});
