<?php

namespace App\FileUpload\GraphQL\Mutations;

use Aws\S3\S3Client;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CreateSignedUrlMutation
{
    public function __invoke($root, array $args): array
    {
        $bucket = config("filesystems.disks.s3.bucket");

        $client = $this->storageClient();

        $uuid = (string) Str::uuid();

        $expiresAfter = config("vapor.signed_storage_url_expires_after", 5);

        $signedRequest = $client->createPresignedRequest(
            $this->createCommand(
                $args,
                $client,
                $bucket,
                $key = "tmp/" . $uuid
            ),
            sprintf("+%s minutes", $expiresAfter)
        );

        $uri = $signedRequest->getUri();

        return [
            "uuid" => $uuid,
            "bucket" => $bucket,
            "key" => $key,
            "url" =>
                $uri->getScheme() .
                "://" .
                $uri->getAuthority() .
                $uri->getPath() .
                "?" .
                $uri->getQuery(),
            "headers" => $this->headers($args, $signedRequest),
        ];
    }

    protected function createCommand(
        array $args,
        S3Client $client,
        string $bucket,
        string $key
    ) {
        $visibility = $args["visibility"] ?? $this->defaultVisibility();
        $contentType = $args["content_type"] ?? "application/octet-stream";
        $cacheControl = $args["cache_control"] ?? null;
        $expires = $args["expires"] ?? null;

        return $client->getCommand(
            "putObject",
            array_filter([
                "Bucket" => $bucket,
                "Key" => $key,
                "ACL" => $visibility,
                "ContentType" => $contentType,
                "CacheControl" => $cacheControl,
                "Expires" => $expires,
            ])
        );
    }

    protected function headers(array $args, $signedRequest): array
    {
        $contentType = $args["content_type"] ?? "application/octet-stream";

        return array_merge($signedRequest->getHeaders(), [
            "Content-Type" => $contentType,
        ]);
    }

    protected function storageClient(): S3Client
    {
        return Storage::disk()->getClient();
    }

    protected function defaultVisibility(): string
    {
        return "private";
    }
}
