/* eslint-disable unicorn/no-useless-undefined */
import { useState } from 'preact/hooks'
import { useFilsnap } from 'filsnap-adapter-react'

const Account = () => {
  const { isLoading, snap } = useFilsnap()
  const [error, setError] = useState(
    /** @type {string | undefined | null} */ (undefined)
  )
  const [address, setAddress] = useState(
    /** @type {string | undefined | null} */ (undefined)
  )
  const [balance, setBalance] = useState(
    /** @type {string | undefined | null} */ (undefined)
  )
  const [publicKey, setPublicKey] = useState(
    /** @type {string | undefined| null} */ (undefined)
  )

  const handleGetAddress = async () => {
    const addressResponse = await snap?.getAddress()
    if (addressResponse && addressResponse.result) {
      setAddress(addressResponse.result)
    }
    if (addressResponse && addressResponse.error) {
      setError(addressResponse.error.message)
    }
  }

  const handleGetBalance = async () => {
    const response = await snap?.getBalance()
    if (response && response.result) {
      setBalance(response.result)
    }
    if (response && response.error) {
      setError(response.error.message)
    }
  }

  const handleGetPublicKey = async () => {
    const response = await snap?.getPublicKey()
    if (response && response.result) {
      setPublicKey(response.result)
    }
    if (response && response.error) {
      setError(response.error.message)
    }
  }

  const handleExportPrivateKey = async () => {
    const response = await snap?.exportPrivateKey()
    if (response && response.error) {
      setError(response.error?.message)
    }
  }

  return (
    <div class="Box Cell100">
      <h3>Account Details</h3>
      {error && <code data-testid="error">{error}</code>}
      <br />
      <button
        data-testid="get-address"
        onClick={handleGetAddress}
        disabled={isLoading}
      >
        Get Address
      </button>
      <code data-testid="address-result">{address}</code>
      <br />
      <button
        data-testid="get-balance"
        onClick={handleGetBalance}
        disabled={isLoading}
      >
        Get Balance
      </button>
      <code data-testid="balance-result">{balance}</code>
      <br />
      <button
        data-testid="get-public-key"
        onClick={handleGetPublicKey}
        disabled={isLoading}
      >
        Get Public Key
      </button>
      <code data-testid="public-key-result">{publicKey}</code>
      <br />
      <button data-testid="get-private-key" onClick={handleExportPrivateKey}>
        Get Private Key
      </button>

      <br />
      <button
        data-testid="get-private-key"
        onClick={() => snap?.switchOrAddChain('testnet')}
        disabled={isLoading}
      >
        Add FEVM Testnet
      </button>
    </div>
  )
}

export default Account
