import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="fixed right-6 top-6 flex justify-end">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}
