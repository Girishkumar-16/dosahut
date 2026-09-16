"use client";

import { useState, useTransition } from "react";

type Success = {
  label: string;
  rewardCode: string;
  redeemedAtLabel: string;
};

/**
 * The till-side form. Built for someone standing at a counter with a queue:
 * big targets, one field to retype between customers, and a result that can be
 * read at arm's length without interpretation.
 */
export default function StaffRedeemForm() {
  const [pin, setPin] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Success | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // 16px minimum, or iOS Safari zooms the page the moment a field is focused —
  // which on a phone behind a counter means pinching back out every customer.
  const field =
    "w-full rounded-xl border-2 border-cream-200 bg-cream-0 px-4 py-3 text-base font-semibold text-ink-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40";

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setResult(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/vip/redeem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rewardCode: code, pin }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Something went wrong.");
          return;
        }
        setResult(data.reward);
      } catch {
        setError("Could not reach the server. Check the connection.");
      }
    });
  }

  function reset() {
    // The PIN stays: the same staff member serves the next customer straight
    // away, and retyping it every time is what makes people write it on a note
    // stuck to the till.
    setCode("");
    setResult(null);
    setError(null);
  }

  if (result) {
    return (
      <div className="rounded-2xl border-2 border-green-600 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M4 12.5l5.5 5.5L20 7" />
          </svg>
        </div>

        <p className="mt-4 font-heading text-sm uppercase tracking-widest text-green-800">
          Redeemed
        </p>
        <p className="mt-1 font-display text-3xl leading-tight text-green-900">
          {result.label}
        </p>
        <p className="mt-3 font-mono text-sm text-green-800">
          {result.rewardCode}
        </p>
        <p className="mt-1 text-xs text-green-800">{result.redeemedAtLabel}</p>

        <p className="mt-4 text-sm font-semibold text-green-900">
          Give the customer their reward.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-5 w-full rounded-xl bg-green-700 px-5 py-3 font-heading text-base uppercase tracking-wide text-white"
        >
          Redeem another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-2xl border-2 border-red-600 bg-red-50 p-5 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth={3}
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M12 7v7M12 17.5v.5" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-red-900">
            {error}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 w-full rounded-xl bg-red-700 px-5 py-2.5 font-heading text-sm uppercase tracking-wide text-white"
          >
            Try another code
          </button>
        </div>
      )}

      <div>
        <label
          htmlFor="staff-pin"
          className="mb-1.5 block text-sm font-semibold text-cream-0"
        >
          Staff PIN
        </label>
        <input
          id="staff-pin"
          className={field}
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          required
        />
      </div>

      <div>
        <label
          htmlFor="staff-code"
          className="mb-1.5 block text-sm font-semibold text-cream-0"
        >
          Reward or staff code
        </label>
        <input
          id="staff-code"
          className={`${field} uppercase tracking-widest`}
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          type="text"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          placeholder="LASSI-HKTLMI"
          required
        />
        <p className="mt-1.5 text-xs text-cream-200">
          Either code on the customer&rsquo;s screen works.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending || !pin || !code}
        className="w-full rounded-xl bg-orange-500 px-5 py-4 font-heading text-lg uppercase tracking-wide text-cream-0 transition hover:bg-orange-600 disabled:opacity-50"
      >
        {pending ? "Checking…" : "Redeem"}
      </button>
    </form>
  );
}
