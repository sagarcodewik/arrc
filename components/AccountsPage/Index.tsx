"use client";

import { useEffect, useMemo, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Plus, Zap, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import AccountCard from "./AccountCard";

import {
  API_PLAID_CREATE_LINK_TOKEN,
  API_PLAID_EXCHANGE_TOKEN,
  API_PLAID_ACCOUNTS,
  API_PLAID_ACCOUNT_DELETE,
} from "@/utils/api/APIConstant";

import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";

export default function AccountsPage() {
  const [plaidToken, setPlaidToken] = useState<string>("");
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [openPlaid, setOpenPlaid] = useState(false);

  const loadAccounts = async () => {
    try {
      setLoading(true);

      const res = await getApiWithOutQuery({
        url: API_PLAID_ACCOUNTS,
      });

      setAccounts(res?.data || []);
    } catch (error) {
      console.error("Failed to load accounts", error);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      await getApiWithOutQuery({ url: API_PLAID_ACCOUNTS });
      await loadAccounts();
    } finally {
      setSyncing(false);
     
    }
  };

  const handleConnectBank = async () => {
    try {
 
      const res = await apiPost({
        url: API_PLAID_CREATE_LINK_TOKEN,
        values: {},
      });

      const token = res?.data?.link_token;
      if (!token) {
        alert("Failed to create Plaid link token");
        return;
      }

      setPlaidToken(token);
      setOpenPlaid(true);
    } finally {
      setLoading(false);
    }
  };

  const plaidConfig = useMemo(
    () => ({
      token: plaidToken,
      product: ["auth", "transactions"],
      onSuccess: async (public_token: string) => {
        await apiPost({
          url: API_PLAID_EXCHANGE_TOKEN,
          values: { public_token },
        });

          await getApiWithOutQuery({
              url: API_PLAID_ACCOUNTS,
            });

        await loadAccounts();
        setOpenPlaid(false);
      },
      onExit: () => setOpenPlaid(false),
    }),
    [plaidToken]
  );

  const { open, ready } = usePlaidLink(plaidConfig);

  useEffect(() => {
    if (openPlaid && ready && plaidToken) {
      open();
    }
  }, [openPlaid, ready, plaidToken, open]);

  const handleRemoveBank = async (accountId: string) => {
    if (!confirm("Are you sure you want to remove this bank?")) return;

    await apiPost({
      url: API_PLAID_ACCOUNT_DELETE,
      values: { accountId },
    });

    await loadAccounts();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Linked Accounts</h1>
          <p className="text-sm text-gray-500">
            Manage your ARRC investment accounts
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2"
          >
            {syncing ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Zap size={16} />
            )}
            Sync Balances
          </Button>

          <Button
            onClick={handleConnectBank}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Connect Account
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="animate-spin text-gray-400" />
        </div>
      )}

      {!loading && accounts.length === 0 && (
        <div className="text-sm text-muted-foreground">
          No bank accounts connected
        </div>
      )}

      {!loading && accounts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <AccountCard
              key={`${acc.account_id}-${acc.itemId}`}
              account={{
                id: acc.account_id,
                itemId: acc.itemId,
                provider: "Plaid",
                title: acc.name,
                emoji: "🏦",
                balance: `$${acc.balances?.current ?? 0}`,
                accountType: acc.subtype || acc.type,
                lastFour: acc.mask,
                lastSync: new Date().toLocaleString(),
                connected: true,
              }}
              onRemove={handleRemoveBank}
            />
          ))}
        </div>
      )}
    </div>
  );
}
