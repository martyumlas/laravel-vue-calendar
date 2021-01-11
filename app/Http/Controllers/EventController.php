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
        $event = Event::updateOrCreate(['id' => $request->id],[
            'title' => $request->title,
            'start' => $request->start,
            'end' => $request->end,
            'color' => $request->color,
            'days' => json_encode($request->days)
        ]);
        return response()->json(['success' => 'Event Saved']);
    }

    public function deleteAll()
    {
        Event::truncate();
        return response()->json(['success' => 'Event Deleted']);
    }
}
