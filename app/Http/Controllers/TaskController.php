<?php

namespace App\Http\Controllers;

use App\Http\Resources\Task as TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\DocBlock\Description;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        return TaskResource::collection(Task::searchIndex([
            'name' => $request->name,
            'completed' => $request->completed

        ]));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'string|required',
            'description' =>'string|required',
            'completed' => 'required'
        ]);

        $task = new Task([
           'name' => $request->name,
            'description' => $request->description,
            'completed' => $request->completed
        ]);

        $task->save();

        return response()->json([
            'data'=> 'Tarea Creada'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return new TaskResource(Task::findOrfail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|required',
            'description' =>'string|required',
            'completed' => 'required'
        ]);

        $task = Task::findOrFail($id);

        $task->name = $request->name;
        $task->description = $request->description;
        $task->completed = $request->completed;
        $task->save();

        return response()->json([
            'data'=> 'Tarea Actualizada'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json([
            'data'=> 'Tarea Eliminada'
        ]);

    }
}
