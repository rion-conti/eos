"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use "next/router" if using Pages Router
import Link from "next/link";

type UnauthorizedProps = {
  title?: string;
  message?: string;
  redirectTo?: string;
  countdownSeconds?: number;
}

export default function Unauthorized({
  title = "401 - Access Denied",
  message = "You do not have permission to view this page. Please sign in with an authorized account.",
  redirectTo = "/signin",
  countdownSeconds = 5,
}: UnauthorizedProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push(redirectTo);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, router, redirectTo]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
        {/* Visual Anchor / Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Content */}
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href={redirectTo}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In Now
          </Link>
          <Link
            href="/"
            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Countdown Footer */}
        <p className="mt-6 text-xs text-gray-400 dark:text-gray-500" aria-live="polite">
          Redirecting to login in <span className="font-semibold text-blue-500">{timeLeft}</span> seconds...
        </p>
      </div>
    </main>
  );
}