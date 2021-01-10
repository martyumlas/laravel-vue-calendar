<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $event = Event::all();
        return response()->json($event);
    }

    public function store(Request $request)
    {
        // $data = $request->only('name', 'start', 'end');
        // $data['days'] = json_encode($request->days);
        $event = Event::updateOrCreate(['id' => $request->id],[
            'name' => $request->name,
            'start' => $request->start,
            'end' => $request->end,
            'color' => $request->color,
        ]);
        return response()->json($event);
    }
}
