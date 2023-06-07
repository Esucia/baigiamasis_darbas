<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $emfilter = new \stdClass();
        $emfilter->name = "";
        $filter = $request->session()->get("food_filter", $emfilter);
        return inertia('Foods/Index', [
            'can' => [
                'edit' => Gate::allows("edit"),
            ],
            "foods" => Food::filter($filter)->with('category')->get(),
            "filter" => $filter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Foods/Create', [
            "categories" => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:32',
            'summary' => 'required|min:3|max:255',
            'isbn' => 'required|min:3|numeric',
            'page' => 'required|numeric',
            'category_id' => 'required'
        ],
            [
//            name'=>'Pavadinimas yra privalomas, ne ilgesnis negu 32 ir ne trumpesnis negu 32 simboliai',
//            'summary'=>'Santrumpa yra privaloma, ne ilgesne negu 255 simboliai',
//            'isbn'=>'Privalomas, tik skaitmenys',
//            'page'=>'Privalomas, tik skaitmenys',
//            'category_id'=>'Privalomas'
            ]);
        $food = Food::create($request->all());
        if ($request->file("picture") != null) {
            $request->file("picture")->store("/public/foods");
            $food->picture = $request->file("picture")->hashName();

        }

        /**
         * Display the specified resource.
         */
    }
    public function show(Food $food)
        {
            //
        }

        /**
         * Show the form for editing the specified resource.
         */
    public function edit(Food $food)
    {
        return inertia("Foods/Edit", [
            "food" => $food,
            "categories" => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, Food $food)
    {
        if ($request->file("picture") != null) {
            $request->file("picture")->store("/public/foods");
            $food->picture = $request->file("picture")->hashName();
        }
        $food->fill($request->all());
        $food->save();
        return to_route("foods.index");
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Food $food)
    {
        $food->delete();
        return to_route("foods.index");
    }


    public function filter(Request $request)
        {
            $filter = new \stdClass();
            $filter->name = $request->name;
            $request->session()->put("food_filter", $filter);
            to_route("foods.index");
        }

}
