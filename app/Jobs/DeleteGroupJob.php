<?php

namespace App\Jobs;

use App\Events\GroupDeleted;
use App\Models\Group;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DeleteGroupJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Group $group)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        GroupDeleted::dispatch($this->group);

        $this->group->last_message_id = null;
        $this->group->save();

        // iterate over all messages and delete them including media files
        $this->group->messages->each->delete();

        // remove all users from the group
        $this->group->users()->detach();

        // finally delete the group itself
        $this->group->delete();
    }
}
