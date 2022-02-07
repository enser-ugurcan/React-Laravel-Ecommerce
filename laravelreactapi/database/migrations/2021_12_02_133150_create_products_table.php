<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id');
            $table->string('meta_title')->nullable();
            $table->string('meta_keyword')->nullable();
            $table->string('meta_descrip')->nullable();
            $table->string('slug');
            $table->string('size');
            $table->string('color');
            $table->string('name');
            $table->mediumText('description')->nullable();
            $table->string('brand');
            $table->string('selling_price');
            $table->string('original_price');
            $table->string('qty');
            $table->string('image')->nullable();
            $table->string('image_alt_1')->nullable();
            $table->string('image_alt_2')->nullable();
            $table->string('image_alt_3')->nullable();
            $table->tinyInteger('featured')->default('0')->nullable();
            $table->tinyInteger('popular')->default('0')->nullable();
            $table->tinyInteger('status')->default('0')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
