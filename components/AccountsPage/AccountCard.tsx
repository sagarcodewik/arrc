"use client";
import React from "react";
export interface Account { id: string; provider: string; title: string; emoji?: string; balance: string; accountType: string; lastFour: string; lastSync: string; tags?: string[]; connected?: boolean;}
interface Props { account: Account; onRemove?: (id: string) => void;}
export default function AccountCard({ account, onRemove }: Props) {
  return (
    <div className="h-full">
      <div className="rounded-lg bg-card text-card-foreground shadow-sm flex flex-col h-full bg-gradient-to-br from-white to-slate-50 border transition-shadow duration-300 border-purple-200 shadow-purple-100">
        <div className="space-y-1.5 p-6 flex flex-row items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>{account.emoji ?? "🏦"}</span>
            <div>
              <h3 className="font-semibold tracking-tight text-lg text-slate-900">{account.title}</h3>
              <p className="text-sm text-slate-600">{account.provider}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 border-emerald-200" role="status" aria-label={account.connected ? "connected" : "disconnected"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-1.5" aria-hidden>
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              {account.connected ? "connected" : "disconnected"}
            </div>
            {account.tags?.length ? (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 border-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1" aria-hidden>
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                </svg>
                {account.tags.join(", ")}
              </div>
            ) : null}
          </div>
        </div>
        <div className="p-6 pt-0 flex-grow space-y-4">
          <div className="p-4 rounded-lg border bg-purple-50/70 border-purple-200/80">
            <div className="text-sm text-slate-500">Current Balance</div>
            <div className="text-2xl font-bold text-slate-900">{account.balance}</div>
            <p className="text-xs text-purple-600 mt-1">Sample balance for testing</p>
          </div>
          <div className="text-xs text-slate-500 space-y-1">
            <p> <strong>Account Type:</strong>{" "} <span className="capitalize">{account.accountType}</span></p>
            <p><strong>Account Number:</strong> •••• {account.lastFour}</p>
            <p><strong>Last Sync:</strong> {account.lastSync}</p>
          </div>
        </div>

        <div className="flex items-center p-6 pt-0">
          <button type="button" onClick={() => onRemove?.(account.id)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 w-full bg-red-100 text-red-700 hover:bg-red-200 border border-red-200" aria-label={`Remove ${account.title}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2" aria-hidden>
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
            Remove Demo
          </button>
        </div>
      </div>
    </div>
  );
}