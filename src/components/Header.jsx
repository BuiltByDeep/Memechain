export default function Header({ onConnect, account, balance, onRefreshBalance }) {
  return (
    <header className="bg-surface border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-primary">MEMEChain 🎨</h1>
          <span className="text-sm text-gray-400">Create, Own, Prove</span>
        </div>
        
        <div className="flex items-center gap-4">
          {account ? (
            <div className="flex items-center gap-3 bg-dark px-4 py-2 rounded-lg">
              <div className="text-sm">
                <div className="text-gray-400">Connected</div>
                <div className="font-mono text-xs">{account.slice(0, 6)}...{account.slice(-4)}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-green-400">
                  {balance || '0.0000'} PAS
                </div>
                {onRefreshBalance && (
                  <button
                    onClick={onRefreshBalance}
                    className="text-xs text-gray-400 hover:text-white"
                    title="Refresh balance"
                  >
                    🔄
                  </button>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
