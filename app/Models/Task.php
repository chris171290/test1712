<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "_tasks";

    protected $fillable = [
        'name',
        'description',
        'completed'
    ];

    static function searchIndex(array $parameters = [])
    {
        $query = DB::table('_tasks', 'sf');
        $query->where('sf.deleted_at', '=',null);
        if (!empty($parameters["id"])) {
            $query->where('sf.id', '=',$parameters["id"]);
        }
        if (!empty($parameters["name"])) {
            $query->where('sf.name', 'like', '%' . $parameters["name"] . '%');
        }
        if (!empty($parameters["completed"])) {
            $query->where('sf.completed', '=',$parameters["completed"]);

        }

        $query->selectRaw('sf.id, sf.name, sf.description, sf.completed');
        $query->simplePaginate(20);
        return $query->get();
    }

}
