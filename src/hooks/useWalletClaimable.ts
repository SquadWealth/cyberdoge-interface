import { useMemo, useEffect, useState } from 'react'
import { useSigner, useContract, useBlockNumber } from 'wagmi'
import CyberDoge_ABI from '../constants/abis/CyberDoge.json'

export function useWalletClaimable(accountAddress?: string): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner()
  const [{ data: blockNumber, error, loading }, getBlockNumber] = useBlockNumber({ watch: true })
  const contract = useContract({
    addressOrName: '0x851a3954074473b6fAFb5C2717D3C01094CC2698',
    contractInterface: CyberDoge_ABI,
    signerOrProvider: signerData,
  })
  const [claimable, setClaimable] = useState(undefined)

  useEffect(() => {
    if (accountAddress === '' || !contract || !signerData) return

    ;(async () => {
      await contract
        .walletClaimable(accountAddress)
        .then((response: any) => {
          setClaimable(response.toNumber())
        })
        .catch((error: any) => {
          console.log("useWalletClaimable error:", error)
        })
    })()
  }, [contract, accountAddress, signerData, blockNumber])

  return useMemo(() => {
    return claimable ? claimable : null
  }, [claimable])
}
