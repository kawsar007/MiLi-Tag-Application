interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

/**
 * Deliberately simple Prev/Next + "Page X of Y" rather than numbered page
 * links — the orders table is the only consumer today and doesn't need
 * jump-to-page. Kept as its own component so a numbered variant can replace
 * this later without touching the page that uses it.
 */
export default function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const progressPercent = totalPages > 1 ? ((page - 1) / (totalPages - 1)) * 100 : 100;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-cloud-line bg-cloud-card px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm text-steel">
          Page <span className="font-semibold tabular-nums text-ink">{page}</span> of{" "}
          <span className="font-semibold tabular-nums text-ink">{totalPages}</span>
          <span className="mx-1.5 text-cloud-line">·</span>
          {total} order{total === 1 ? "" : "s"}
        </span>
        {/* decorative progress indicator — not a jump-to-page control */}
        <div className="h-1 w-full max-w-[160px] overflow-hidden rounded-full bg-cloud" aria-hidden="true">
          <div
            className="h-full rounded-full bg-indigo transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Go to previous page"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-cloud-line bg-white px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo hover:text-indigo hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-cloud-line disabled:hover:text-ink disabled:hover:shadow-none sm:flex-none"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Go to next page"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-cloud-line bg-white px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo hover:text-indigo hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-cloud-line disabled:hover:text-ink disabled:hover:shadow-none sm:flex-none"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// interface PaginationProps {
//   page: number;
//   totalPages: number;
//   total: number;
//   onPageChange: (page: number) => void;
// }

// /**
//  * Deliberately simple Prev/Next + "Page X of Y" rather than numbered page
//  * links — the orders table is the only consumer today and doesn't need
//  * jump-to-page. Kept as its own component so a numbered variant can replace
//  * this later without touching the page that uses it.
//  */
// export default function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
//   if (totalPages <= 1) return null;

//   return (
//     <div className="flex flex-wrap items-center justify-between gap-3 px-1">
//       <span className="text-xs text-steel">
//         Page {page} of {totalPages} · {total} order{total === 1 ? "" : "s"}
//       </span>
//       <div className="flex gap-2">
//         <button
//           type="button"
//           onClick={() => onPageChange(page - 1)}
//           disabled={page <= 1}
//           className="rounded-full border border-cloud-line bg-cloud-card px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-indigo hover:text-indigo disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-cloud-line disabled:hover:text-ink"
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           onClick={() => onPageChange(page + 1)}
//           disabled={page >= totalPages}
//           className="rounded-full border border-cloud-line bg-cloud-card px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-indigo hover:text-indigo disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-cloud-line disabled:hover:text-ink"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }