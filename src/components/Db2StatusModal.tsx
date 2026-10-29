import React, { useState } from 'react';
import { Database, CheckCircle2, AlertTriangle, RefreshCw, X, Server, ShieldCheck, Terminal, ExternalLink } from 'lucide-react';

interface Db2StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: {
    configured: boolean;
    connected: boolean;
    source: 'ibm_db2' | 'fallback_local_cache';
    message: string;
    serverTime?: string;
    serverName?: string;
    latencyMs?: number;
    error?: string;
  };
  onRefresh: () => Promise<void>;
}

export const Db2StatusModal: React.FC<Db2StatusModalProps> = ({
  isOpen,
  onClose,
  status,
  onRefresh,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                IBM Db2 Database Status
              </h3>
              <p className="text-xs text-slate-400">
                TechX Summit 2026 Db2 Hack Challenge Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3.5 ${
              status.connected
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
            }`}
          >
            {status.connected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 text-sm">
              <div className="font-bold flex items-center gap-2">
                <span>
                  {status.connected
                    ? 'IBM Db2 Live Connection Verified'
                    : status.configured
                    ? 'Db2 Configured but Unreachable'
                    : 'Db2 Running in Safe Fallback Mode'}
                </span>
                <span
                  className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${
                    status.connected
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                      : 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                  }`}
                >
                  {status.source === 'ibm_db2' ? 'Live SQL' : 'Local Cache'}
                </span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">{status.message}</p>
              {status.error && (
                <p className="text-[11px] font-mono bg-black/40 p-2 rounded-lg text-red-300 mt-2 border border-red-500/20">
                  {status.error}
                </p>
              )}
            </div>
          </div>

          {/* Diagnostics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Database Engine</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-blue-400" />
                IBM Db2 on Cloud (SSL)
              </span>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Driver Package</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Official ibm_db v4.1.0
              </span>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Data Source Mode</span>
              <span className="font-semibold text-white">
                {status.source === 'ibm_db2' ? 'Live Relational Tables' : 'In-Memory Fallback Cache'}
              </span>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 block mb-1">Roundtrip Latency</span>
              <span className="font-semibold text-white">
                {typeof status.latencyMs === 'number' ? `${status.latencyMs} ms` : 'N/A'}
              </span>
            </div>
          </div>

          {/* Instructions to Connect Live Db2 */}
          {!status.connected && (
            <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl space-y-3 text-xs">
              <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                <Terminal className="w-4 h-4 text-teal-400" />
                How to Connect Your IBM Db2 Instance:
              </h4>

              <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                <li>
                  <strong className="text-white">IBM Cloud Console:</strong> Go to your Db2 service and open{' '}
                  <span className="text-blue-300 font-mono">Service Credentials</span>.
                </li>
                <li>
                  <strong className="text-white">Configure .env:</strong> Add credentials to your environment:
                  <div className="bg-black/60 p-2.5 rounded-lg font-mono text-[11px] text-teal-300 mt-1 border border-slate-700 select-all">
                    DB2_HOSTNAME=dashdb-txn-sbox-yp-dal09-xx.services.dal.bluemix.net<br />
                    DB2_PORT=50001<br />
                    DB2_DATABASE=BLUDB<br />
                    DB2_UID=your_db2_user<br />
                    DB2_PWD=your_db2_password<br />
                    DB2_SECURITY=SSL
                  </div>
                </li>
                <li>
                  <strong className="text-white">Run Seeding Script:</strong> Execute in your terminal:
                  <div className="bg-black/60 p-2 rounded-lg font-mono text-[11px] text-amber-300 mt-1 border border-slate-700">
                    npm run seed:db2
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            onClick={handleRefreshClick}
            disabled={isRefreshing}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Testing...' : 'Test Connection'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
