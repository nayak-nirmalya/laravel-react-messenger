<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function byUser(User $user)
    {

    }

    public function byGroup(Group $group)
    {

    }

    public function loadOlder(Message $message)
    {

    }

    public function store(StoreMessageRequest $request)
    {

    }

    public function destroy(Message $message)
    {

    }
}
