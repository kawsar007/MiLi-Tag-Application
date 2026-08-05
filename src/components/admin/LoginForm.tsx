"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Invalid email or password");
        return;
      }
      const destination = searchParams.get("from") || "/admin";
      router.push(destination);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          className="rounded-lg border border-cloud-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-steel/60 transition-colors duration-150 outline-none hover:border-steel/40 focus:border-indigo focus:ring-2 focus:ring-indigo/20"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!error}
          className="rounded-lg border border-cloud-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-steel/60 transition-colors duration-150 outline-none hover:border-steel/40 focus:border-indigo focus:ring-2 focus:ring-indigo/20"
          placeholder="••••••••"
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-600"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo/90 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {isSubmitting ? (
          <>
            <SpinnerIcon className="h-4 w-4 animate-spin" />
            Logging in…
          </>
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.75} />
      <path d="M12 8v5" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" />
      <circle cx={12} cy={16} r={0.9} fill="currentColor" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={2.5} className="opacity-25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}


// "use client";

// import { useState, type FormEvent } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function LoginForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       if (!res.ok) {
//         const data = await res.json().catch(() => null);
//         setError(data?.error ?? "Invalid email or password");
//         return;
//       }
//       const destination = searchParams.get("from") || "/admin";
//       router.push(destination);
//       router.refresh();
//     } catch {
//       setError("Something went wrong. Try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
//       <div className="flex flex-col gap-1.5">
//         <label htmlFor="email" className="text-sm font-medium text-cloud">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           required
//           autoComplete="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="rounded-lg border border-ink-line bg-ink px-4 py-2.5 text-sm text-cloud placeholder:text-steel"
//         />
//       </div>

//       <div className="flex flex-col gap-1.5">
//         <label htmlFor="password" className="text-sm font-medium text-cloud">
//           Password
//         </label>
//         <input
//           id="password"
//           type="password"
//           required
//           autoComplete="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="rounded-lg border border-ink-line bg-ink px-4 py-2.5 text-sm text-cloud placeholder:text-steel"
//         />
//       </div>

//       {error ? <p className="text-sm text-red-400">{error}</p> : null}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="mt-2 rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-deep disabled:opacity-60"
//       >
//         {isSubmitting ? "Logging in…" : "Log in"}
//       </button>
//     </form>
//   );
//}
