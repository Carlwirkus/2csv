<?php

namespace App\System\Tests\Concerns;

use App\System\Tests\TestCase;
use App\Users\Authentication\Data\ClerkUser;
use Firebase\JWT\JWT;
use Illuminate\Http\Testing\File;
use Illuminate\Support\Str;
use Illuminate\Testing\TestResponse;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;

/**
 * @mixin TestCase
 */
trait HasAuthenticatedRequests
{
  use MakesGraphQLRequests;

  public function initializeHasAuthenticatedRequests(): void
  {

  }

  /**
   * Execute a query as if it was sent as a request to the server.
   *
   * @param  string  $query  The GraphQL query to send
   * @param  array<string, mixed>  $variables  The variables to include in the query
   * @param  array<string, mixed>  $extraParams  Extra parameters to add to the JSON payload
   * @param  array<string, mixed>  $headers  HTTP headers to pass to the POST request
   *
   * @return TestResponse
   */
  protected function authenticatedGQL(
    string $query,
    array $variables = [],
    array $extraParams = [],
    array $headers = []
  ): TestResponse {
    $mergedHeaders = [...$this->getAuthHeaders(), ...$headers];

    return $this->graphQL($query, $variables, $extraParams, $mergedHeaders);
  }

  /**
   * Send a multipart form request to GraphQL.
   *
   * This is used for file uploads conforming to the specification:
   * https://github.com/jaydenseric/graphql-multipart-request-spec
   *
   * @param  array<string, mixed>|array<int, array<string, mixed>>  $operations
   * @param  array<array<int, string>>  $map
   * @param  array<File>|array<array<mixed>>  $files
   * @param  array<string, string>  $headers  Will be merged with Content-Type: multipart/form-data
   *
   * @return TestResponse
   */
  protected function authenticatedMultipartGraphQL(
    array $operations,
    array $map,
    array $files,
    array $headers = []
  ): TestResponse {
    $mergedHeaders = [...$this->getAuthHeaders(), ...$headers];

    return $this->multipartGraphQL($operations, $map, $files, $mergedHeaders);
  }

  protected function authenticatedPost(
    string $url,
    array $data = [],
    array $headers = []
  ): TestResponse {
    $mergedHeaders = [...$this->getAuthHeaders(), ...$headers];
    return $this->post($url, $data, $mergedHeaders);
  }

  protected function getAuthHeaders(): array
  {
    $privateKey = openssl_pkey_new();
    $publicKeyPem = openssl_pkey_get_details($privateKey)["key"];

    config()->set("clerk.public_key", $publicKeyPem);

    $clerkUser = ClerkUser::from([
        'id' => Str::uuid()->toString()
    ]);


    $jwt = JWT::encode(
      [
        "sub" => $clerkUser->id,
      ],
      $privateKey,
      "RS256"
    );

    return [
      "authorization" => sprintf("Bearer %s", $jwt),
    ];
  }
}
