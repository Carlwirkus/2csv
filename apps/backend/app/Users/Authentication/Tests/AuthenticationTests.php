<?php

namespace App\Users\Authentication\Tests;

use App\System\Tests\TestCase;

class AuthenticationTests extends TestCase
{
    public function test_it_fails_authentication_to_a_guarded_route(): void
    {
        $response = $this->graphQL(/** @lang GraphQL */ '
          mutation CreateXeroLink{
            xeroAccountLink(redirect_url: "https://example.com")
          }
    ');

        $response->assertGraphQLErrorMessage("Unauthenticated.");

    }


    public function test_it_can_authenticate_with_an_access_token(): void
    {
        $response = $this->authenticatedGQL(/** @lang GraphQL */ '
          mutation CreateXeroLink{
            xeroAccountLink(redirect_url: "https://example.com")
          }
    ');

        $response->assertGraphQLErrorFree();
    }
}
