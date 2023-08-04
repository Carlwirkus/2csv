<?php

namespace App\Connections\Xero\Account\Http;

use App\Connections\Xero\Account\Services\XeroOAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class XeroOAuthController
{
    public function __construct(protected XeroOAuthService $authService)
    {
    }

    public function callback(Request $request): JsonResponse|RedirectResponse
    {
        if ($error = $request->get("error")) {
            return response()->json(["error" => $error], 400);
        }

        $code = $request->get("code");
        $state = $request->get("state");
        [, $request] = $this->authService->createAccount($code, $state);

        return redirect()->to($request->redirect_url);
    }
}
