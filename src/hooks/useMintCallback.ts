import { useMemo, useEffect, useState } from 'react'
import { BigNumberish } from 'ethers'
import { useSigner, useContract, useBlockNumber, useAccount } from 'wagmi'
import CyberDoge_ABI from '../constants/abis/CyberDoge.json'

export function useMintCallback(canClaim?: boolean | undefined): any {
  const [{ data: signerData }] = useSigner()

  const contract = useContract({
    addressOrName: '0x851a3954074473b6fAFb5C2717D3C01094CC2698',
    contractInterface: CyberDoge_ABI,
    signerOrProvider: signerData,
  })

  return useMemo(() => {
    return {
      callback: async function onClaim(): Promise<any> {
        if (!canClaim || canClaim === undefined || !contract || !signerData) return

        return await contract
          ._mint()
          .then((response: any) => {
            return response.hash
          })
          .catch((error: any) => {
            console.error('useMintCallback error:', error)
          })
      },
    }
  }, [canClaim, contract, signerData])
}
