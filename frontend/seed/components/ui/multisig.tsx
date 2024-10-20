'use client'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import { writeContract,  readContract } from '@wagmi/core'
import { config } from "@/config/index"
import { multiSigAbi } from './abi'

// Multi-sig contract address and ABI
const multiSigAddress = '0x1c9a2f33475accf2f56c2f7132554ea0b48fa6cc'

function MultiSigApp() {
  const { address, isConnecting, isDisconnected } = useAccount()

  // State to hold contract data
  const [confirmationsRequired, setConfirmationsRequired] = useState<number | null>(null)
  const [transactionCount, setTransactionCount] = useState<number | null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(false)

  // Step 1: Initialize the multisig wallet (Admin Function)
  const initializeMultiSig = async (owners: string[], confirmations: number) => {
    try {
      const result = await writeContract(config,{
        address: multiSigAddress,
        abi: multiSigAbi,
        functionName: 'initialize',
        args: [owners, confirmations],
      })
      console.log('Multi-sig wallet initialized:', result)
    } catch (error) {
      console.error('Error initializing multi-sig:', error)
    }
  }

  // Step 2: Submit a transaction to be confirmed by owners
  const submitTransaction = async (to: string, value: bigint, data: string) => {
    try {
      const result = await writeContract(config,{
        
        address: multiSigAddress,
        abi: multiSigAbi,
        functionName: 'submitTransaction',
        args: [to, value, data],
      })
      console.log('Transaction submitted:', result)
    } catch (error) {
      console.error('Error submitting transaction:', error)
    }
  }

  // Step 3: Fetch contract data using useEffect
  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const confirmations = await readContract(config,{
          address: multiSigAddress,
          abi: multiSigAbi,
          functionName: 'numConfirmationsRequired',
        })
        setConfirmationsRequired(Number(confirmations))

        const txCount = await readContract(config,{
          address: multiSigAddress,
          abi: multiSigAbi,
          functionName: 'getTransactionCount',
        }) 
        setTransactionCount(Number(txCount))

        const ownerStatus = await readContract(config, {
          address: multiSigAddress,
          abi: multiSigAbi,
          functionName: 'isOwner',
          args: [address],
        })
        setIsOwner(Boolean(ownerStatus))
      } catch (error) {
        console.error('Error fetching contract data:', error)
      }
    }

    fetchContractData()
  }, [address])

  // UI/Loading logic
  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>

  return (
    <div>
      <h1>Multi-Sig Contract Overview</h1>

      <p><strong>Wallet Address:</strong> {address}</p>
      <p><strong>Confirmations Required:</strong> {confirmationsRequired?.toString()}</p>
      <p><strong>Total Transactions:</strong> {transactionCount?.toString()}</p>
      <p><strong>Is User Owner:</strong> { isOwner ? 'Yes' : 'No'}</p>

      {/* Admin Panel to Initialize Multi-Sig */}
      <button onClick={() => initializeMultiSig(['address!', '0xOwner2'], 2)}>
        Initialize 
      </button><br></br>

      {/* Submit Transaction */}
      <button onClick={() => submitTransaction('0xRecipient', BigInt(1e18), '0x')}>
        Submit 
      </button>
    </div>
  )
}

export default MultiSigApp
