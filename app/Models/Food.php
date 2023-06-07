<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $fillable = ['name','summary','isbn','page','category_id'];

    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function scopeFilter(Builder $query, $filter){
        if ($filter->name!=null) {
            $query->where("name", "like", "%$filter->name%");
        }

    }
}
