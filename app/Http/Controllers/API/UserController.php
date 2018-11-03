<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;

class UserController extends Controller
{
    public $successStatus = 200;

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->accessToken; 
            return response()->json([
                'token' => $success['token'],
                'user' => $user,
                'success' => true
            ], $this->successStatus); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }

    /** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'c_password' => 'required|same:password', 
        ]);
		if ($validator->fails()) { 
		            return response()->json(['error'=>$validator->errors()], 401);            
		        }
		$input = $request->all(); 
		        $input['password'] = bcrypt($input['password']); 
		        $user = User::create($input); 
		        $success['token'] =  $user->createToken('MyApp')->accessToken; 
		        $success['name'] =  $user->name;
		return response()->json(['success'=>$success], $this->successStatus); 
    }
	/** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function detail($id) 
    { 
        $user = User::find($id);
        return response()->json($user, $this->successStatus); 
    } 

    /**
     * delete api
     */
    
    public function destroy($id){
        $user = User::where('id', $id)->firstOrFail();
        $user->delete();
        return response()->json($user, $this->successStatus);
    }
    /**
     * [store description]
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function update(Request $request,$id){

        $user = User::where('id', $id)->firstOrFail();
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();

        return response()->json($user, $this->successStatus);
    }

    public function store(Request $request){
        $email = $request->email;
        $name = $request->name;
        $password = bcrypt("123456");

        $user = User::create([
            'email'=>$email,
            'name' => $name,
            'password' => $password
        ]);

        return response()->json($user, $this->successStatus);
    }
}
