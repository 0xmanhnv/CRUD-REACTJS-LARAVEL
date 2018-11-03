<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\User;
Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');

// Route::group(['middleware' => 'auth:api'], function(){
// 	Route::post('details', 'API\UserController@details');
// });
Route::post('detail/{id}', 'API\UserController@detail');
Route::delete('delete/{id}', 'API\UserController@destroy');
Route::put('update/{id}', 'API\UserController@update');
Route::post('store', 'API\UserController@store');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', function(){
	$users = User::all();
	return response()->json($users, 200);
});
