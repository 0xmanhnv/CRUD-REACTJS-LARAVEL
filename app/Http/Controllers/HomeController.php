<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        return view('welcome', [
            'packages' => $this->getPackages(),
        ]);
    }
    private function getPackages() : array
    {
        $path = public_path('packages.json');
        $contents = file_get_contents($path);
        return json_decode($contents, true);
    }
}
