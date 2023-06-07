<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Hello');
});

Route::get('/dashboard', function () {
    return Inertia::render('Hello');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource("foods",\App\Http\Controllers\FoodController::class)->only(["index"]);
Route::resource("categories",\App\Http\Controllers\CategoryController::class)->only(["index"]);
Route::post("/foods/filter",[\App\Http\Controllers\FoodController::class, "filter"])->name("foods.filter");


Route::middleware("edit")->group(function (){
    Route::resource("foods",\App\Http\Controllers\FoodController::class)->except(["index"]);
    Route::resource("categories",\App\Http\Controllers\CategoryController::class)->except(["index"]);
});
require __DIR__.'/auth.php';
