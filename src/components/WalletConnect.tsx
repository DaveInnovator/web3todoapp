import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut } from 'lucide-react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-sm text-muted-foreground">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          className="border border-primary/30 hover:border-primary/60 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mx-auto">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="w-full cursor-pointer border border-border/50 hover:border-primary/50 shadow-sm rounded-lg py-2 flex items-center justify-center gap-2 transition-colors"
        >
          <Wallet className="w-4 h-4" />
          <span className="truncate">Connect {connector.name}</span>
        </Button>
      ))}
    </div>
  )
}
