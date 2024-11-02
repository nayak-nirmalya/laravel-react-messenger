<x-mail::message>
Hello {{ $user->name }},

@if ($user->is_admin)
You are now admin in the system. You can now add and block users.
@else
Your role was changed to "Regular User". You are no longer able to add or block users.
@endif

Thank you, <br>
{{ config('app.name') }}
</x-mail::message>