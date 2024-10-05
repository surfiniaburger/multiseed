# Multi-Signature Wallet Interface Documentation
## Overview
The IMultiSig interface defines a multi-signature wallet in Solidity, allowing multiple owners to manage funds with required confirmations for transactions.

## License
*License*: MIT-OR-APACHE-2.0
Version: ^0.8.23
Functions
State Functions
*numConfirmationsRequired()*: Returns the number of confirmations needed to execute a transaction.

*isOwner(address check_address)*: Checks if an address is an owner of the wallet.

*getTransactionCount()*: Returns the total number of submitted transactions.

## Transaction Functions
*deposit()*: Allows users to deposit Ether.

*submitTransaction(address to, uint256 value, bytes calldata data)*: Submits a new transaction for confirmation.

*executeTransaction(uint256 tx_index)*: Executes a transaction if it has enough confirmations.

*confirmTransaction(uint256 tx_index)*: Confirms a transaction as an owner.

*revokeConfirmation(uint256 tx_index)*: Revokes confirmation of a transaction.

## Initialization

*initialize(address[] memory owners, uint256 num_confirmations_required)*: Sets up the wallet with owners and confirmation requirements.

## Custom Errors

*AlreadyInitialized()*: Contract has been initialized already.

*ZeroOwners()*: No owners provided.

*InvalidConfirmationNumber()*: Confirmation number is invalid.

*InvalidOwner()*: Specified owner address is not valid.

*OwnerNotUnique()*: Duplicate owners provided.

*NotOwner()*: Caller is not an owner.

*TxDoesNotExist()*: Transaction does not exist.

*TxAlreadyExecuted()*: Transaction has already been executed.

*TxAlreadyConfirmed()*: Transaction is already confirmed.

*TxNotConfirmed()*: Transaction has not been confirmed.

*ConfirmationNumberNotEnough()*: Insufficient confirmations to execute.

*ExecuteFailed()*: Transaction execution failed.

## Conclusion
The IMultiSig interface provides a secure way to manage funds with multiple owners, ensuring collaborative decision-making. For more details, visit the Stylus SDK.

# Users can interact with the IMultiSig interface to manage a multi-signature wallet through the following steps:



1. Initialization
Method: initialize
What It Does: Sets up the wallet with a list of owner addresses and the required number of confirmations for transactions.
How to Use:
Call this function once during deployment, providing:
An array of owner addresses.
The number of confirmations needed to execute transactions.
Example:
solidity
Copy code
multiSigWallet.initialize([owner1, owner2, owner3], 2);
2. Depositing Funds
Method: deposit
What It Does: Allows owners to deposit Ether into the wallet.
How to Use:
Call this function and send Ether with the transaction.
Example:
solidity
Copy code
multiSigWallet.deposit{value: 1 ether}();
3. Submitting Transactions
Method: submitTransaction
What It Does: Creates a new transaction that needs to be confirmed by the owners.
How to Use:
Call this function with:
The recipient address.
The amount of Ether to send.
Any additional data needed.
Example:
solidity
Copy code
multiSigWallet.submitTransaction(recipientAddress, amount, data);
4. Confirming Transactions
Method: confirmTransaction
What It Does: Allows an owner to confirm a submitted transaction.
How to Use:
Call this function with the index of the transaction you wish to confirm.
Example:
solidity
Copy code
multiSigWallet.confirmTransaction(transactionIndex);
5. Revoking Confirmation
Method: revokeConfirmation
What It Does: Lets an owner withdraw their confirmation from a transaction.
How to Use:
Call this function with the index of the transaction.
Example:
solidity
Copy code
multiSigWallet.revokeConfirmation(transactionIndex);
6. Executing Transactions
Method: executeTransaction
What It Does: Executes a transaction that has received enough confirmations.
How to Use:
Call this function with the index of the transaction to execute.
Example:
solidity
Copy code
multiSigWallet.executeTransaction(transactionIndex);
7. Checking Ownership
Method: isOwner
What It Does: Checks if an address is an owner of the wallet.
How to Use:
Call this function with the address you want to check.
Example:
solidity
Copy code
bool isOwner = multiSigWallet.isOwner(addressToCheck);
8. Getting Transaction Count
Method: getTransactionCount
What It Does: Retrieves the total number of transactions submitted.
How to Use:
Call this function to get the current transaction count.
Example:
solidity
Copy code
uint256 count = multiSigWallet.getTransactionCount();
## Summary
Users can interact with the IMultiSig interface through a series of function calls to manage transactions securely. Each owner can submit, confirm, and execute transactions, ensuring that funds are handled collaboratively and safely.
