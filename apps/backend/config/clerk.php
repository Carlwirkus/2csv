<?php

return [
    "api_key" => env("CLERK_API_KEY", ""),
    "public_key" => env("CLERK_PEM_FILE", ""),
    "publishable_key" => env("CLERK_PUBLISHABLE_KEY", ""),
    "test_actor_id" => env("CLERK_TEST_ACTOR_ID", ""),
    "test_user_id" => env("CLERK_TEST_USER_ID", ""),
];
