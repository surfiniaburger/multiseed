import { useReadContract, useAccount } from 'wagmi'

// Multi-sig contract address and ABI
const multiSigAddress = '0x1c9a2f33475accf2f56c2f7132554ea0b48fa6cc'
const multiSigAbi = [
  'function numConfirmationsRequired() external view returns (uint256)',
  'function getTransactionCount() external view returns (uint256)',
  'function isOwner(address check_address) external view returns (bool)',
]

function MultiSigReadApp() {
  const { address, isConnecting, isDisconnected } = useAccount()

  // Read the number of confirmations required for a transaction
  const { data: confirmationsRequired, isLoading: loadingConfirmations } = useReadContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: 'numConfirmationsRequired',
  })

  // Read the total number of transactions submitted
  const { data: transactionCount, isLoading: loadingTransactionCount } = useReadContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: 'getTransactionCount',
  })

  // Check if the connected user is an owner of the multi-sig wallet
  const { data: isOwner, isLoading: loadingIsOwner } = useReadContract({
    address: multiSigAddress,
    abi: multiSigAbi,
    functionName: 'isOwner',
    args: [address],  // Dynamically use the connected wallet address
  })

  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>

  if (loadingConfirmations || loadingTransactionCount || loadingIsOwner) {
    return <p>Loading contract data...</p>
  }

  return (
    <div>
      <h1>Multi-Sig Contract Overview</h1>
      
      <p><strong>Wallet Address:</strong> {address}</p>
      <p><strong>Confirmations Required:</strong> {confirmationsRequired?.toString()}</p>
      <p><strong>Total Transactions:</strong> {transactionCount?.toString()}</p>
      <p><strong>Is User Owner:</strong> {isOwner ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default MultiSigReadApp
