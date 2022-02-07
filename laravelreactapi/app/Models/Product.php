<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'category_id',
        'meta_title',
        'meta_keyword',
        'meta_descrip',
        'slug',
        'name',
        'size',
        'color',
        'small_descrip',
        'long_descrip',
        'brand',
        'selling_price',
        'original_price',
        'qty',
        'image',
        'image_alt_1',
        'image_alt_2',
        'image_alt_3',
        'featured',
        'popular',
        'status',
    ];
    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id','id');
    }
    public static function productCount($cat_id){
        $cat_id = Product::where(['category_id'=>$cat_id,'status'=>1])->count();
        return $catCount();
    }
}
