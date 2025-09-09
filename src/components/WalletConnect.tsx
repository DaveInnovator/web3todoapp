import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut } from 'lucide-react'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => disconnect()}
          className="border-primary/20 hover:border-primary/40"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          variant="web3"
          onClick={() => connect({ connector })}
          className="shadow-glow"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect {connector.name}
        </Button>
      ))}
    </div>
  )
}
