<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FrontendController extends Controller
{
    public function category()
    {
        $category=Category::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'category'=>$category
        ]);
    }
    public function product($slug)
    {
        $category = Category::where('slug', $slug)->wherE('status','0')->first();
        if($category)
        {
            $product = Product::where('category_id',$category->id)->where('status','0')->get();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'product_data'=>[
                        'product'=>$product,
                        'category'=>$category,
                    ]
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>400,
                    'message'=>"No Such Product Available"
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>"No Such Category Found"
            ]);
        }
    }
    public function viewproduct($category_slug , $product_name)
    {
        $category = Category::where('slug', $category_slug)->wherE('status','0')->first();
        if($category)
        {
            $product = Product::where('category_id',$category->id)
                              ->where('name',$product_name)
                              ->where('status','0')
                              ->first();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'product'=>$product,
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>400,
                    'message'=>"No Such Product Available"
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>"No Such Category Found"
            ]);
        }
    }
    public function orders(){
        if(auth('sanctum')->check())
        {
            $order_id=auth('sanctum')->user()->email;
            $orders = Order::where('email',$order_id)->get();
            return response()->json([
                'status'=>200,
                'orders'=>$orders,
            ]);
        } 
        else{
            return response()->json([
                'status'=>404,
                'message'=>"No Such Product Available"
            ]);
        }
    }
    public function contact(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required||email|max:255|',
            'message'=>'required'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $contact = new Contact;
            $contact->name = $request->input('name');
            $contact->email = $request->input('email');
            $contact->message = $request->input('message');
            $contact->save();
            return response()->json([
                'status'=>200,
                'message'=>"Thanks For Message",
            ]);

        }
    }
}
