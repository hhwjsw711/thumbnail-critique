"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { useIsSubscribed } from "@/hooks/useIsSubscribed";
import { UpgradeButton } from "@/components/upgrade-button";
import { useSession } from "@/lib/utils";

export function Header() {
  const isSubscriped = useIsSubscribed();
  const { isLoading, isAuthenticated } = useSession();

  return (
    <div className="border-b">
      <div className="h-16 container flex justify-between items-center">
        <Link href="/">ThumbnailRater</Link>

        <div className="flex gap-8">
          {!isLoading && (
            <>
              {isAuthenticated && (
                <>
                  <Link href="/dashboard" className="link">
                    Dashboard
                  </Link>
                  <Link href="/create" className="link">
                    Create
                  </Link>
                  <Link href="/explore" className="link">
                    Explore
                  </Link>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <Link href="/pricing" className="link">
                    Pricing
                  </Link>
                  <Link href="/about" className="link">
                    About
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex gap-4 items-center">
          {!isLoading && (
            <>
              {isAuthenticated && (
                <>
                  {!isSubscriped && <UpgradeButton />}
                  <UserButton />
                </>
              )}
              {!isAuthenticated && <SignInButton />}
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
