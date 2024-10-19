'use client'
import { useAccount } from 'wagmi'
import { writeContract } from '@wagmi/core'
import { config } from "@/config/index"
import { useState } from 'react'

const multiSigAddress = '0x1c9a2f33475accf2f56c2f7132554ea0b48fa6cc'
const multiSigAbi = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "owners",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "num_confirmations_required",
          "type": "uint256"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numConfirmationsRequired",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransactionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "check_address",
          "type": "address"
        }
      ],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "submitTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "txIndex",
          "type": "uint256"
        }
      ],
      "name": "TransactionSubmitted",
      "type": "event"
    }
  ]

function InitializeMultiSig() {
  const { address, isConnecting, isDisconnected } = useAccount()

  // State to hold contract data
  const [owners, setOwners] = useState<string[]>([address!]) // Initialize with the connected user
  const [newOwner, setNewOwner] = useState<string>('') // To hold input value for new owner
  const [confirmationsRequired, setConfirmationsRequired] = useState<number | null>(null)

// Step 1: Initialize the multisig wallet (Admin Function)
const initializeMultiSig = async () => {
    try {
      const result = await writeContract(config, {
        address: multiSigAddress,
        abi: multiSigAbi,
        functionName: 'initialize',
        args: [owners, confirmationsRequired || 1], // Use the owners and confirmation number
      })
      console.log('Multi-sig wallet initialized:', result)
    } catch (error) {
      console.error('Error initializing multi-sig:', error)
    }
  }

  // Handle adding new owners
  const handleAddOwner = () => {
    if (newOwner && newOwner.length === 42) { // Simple check for valid Ethereum address length
      setOwners([...owners, newOwner])
      setNewOwner('') // Clear the input field
    }
  }

  // Handle removing an owner
  const handleRemoveOwner = (index: number) => {
    setOwners(owners.filter((_, i) => i !== index))
  }

  // UI/Loading logic
  if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>

  return (
    <div>
      <h1>Multi-Sig Contract Overview</h1>

      <p><strong>Wallet Address:</strong> {address}</p>

      {/* Confirmations Input */}
      <label>Confirmations Required:</label>
      <input 
        type="number" 
        value={confirmationsRequired ?? 1} 
        onChange={(e) => setConfirmationsRequired(Number(e.target.value))} 
      /><br />

      {/* Owners List */}
      <h3>Owners</h3>
      <ul>
        {owners.map((owner, index) => (
          <li key={index}>
            {owner} 
            {index !== 0 && ( // Prevent removing the user's own address
              <button onClick={() => handleRemoveOwner(index)}>Remove</button>
            )}
          </li>
        ))}
      </ul>

      {/* Add Owner */}
      <input
        type="text"
        placeholder="Enter new owner address"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <button onClick={handleAddOwner}>Add Owner</button><br />

      {/* Admin Panel to Initialize Multi-Sig */}
      <button onClick={initializeMultiSig}>
        Initialize Multi-Sig
      </button>
    </div>
  )
}

export default InitializeMultiSig
