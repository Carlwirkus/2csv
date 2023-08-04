<?php

namespace App\Receipts\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Nwilging\LaravelDiscordBot\Contracts\Notifications\DiscordNotificationContract;

class ReceiptNotification extends Notification implements
    DiscordNotificationContract
{
    public function __construct(public string $message)
    {
    }

    use Queueable;

    public function via($notifiable): array
    {
        return ["discord"];
    }

    public function toDiscord($notifiable): array
    {
        return [
            "contentType" => "plain",
            "channelId" => "1134457424410062898",
            "message" => $this->message,
        ];
    }
}
