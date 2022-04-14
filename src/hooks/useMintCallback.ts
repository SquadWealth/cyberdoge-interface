import { useMemo, useEffect, useState } from 'react';
import { BigNumberish } from 'ethers';
import { useSigner, useContract, useBlockNumber, useAccount } from 'wagmi';
import CyberDoge_ABI from '../constants/abis/CyberDoge.json';

export function useMintCallback(tokenId?: BigNumberish): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const [{ data: accountData }] = useAccount();
  
  const contract = useContract({
    addressOrName: '0x83aB569F0235456f91f5e60E02Ee98b04b3beD07',
    contractInterface: CyberDoge_ABI,
    signerOrProvider: signerData
  });

  return useMemo(() => {

    return {
      callback: async function onClaim(): Promise<any> {
        if (tokenId === '' || !tokenId || !contract || !signerData) return;

        console.log('tokenId: ', tokenId);
        return await contract
                ._mint()
                .then((response: any) => {
                  console.log('useMintCallback response: ', response);
                  return response.hash;
                })
                .catch((error: any) => {
                  console.error('useMintCallback error:' , error);
                })
      }
    }
    // return contract;
  }, [tokenId, contract, signerData])
};