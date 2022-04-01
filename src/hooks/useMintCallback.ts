import { useMemo, useEffect, useState } from 'react';
import { BigNumberish } from 'ethers';
import { useSigner, useContract, useBlockNumber, useAccount } from 'wagmi';
import CyberDoge_ABI from '../constants/abis/CyberDoge.json';

export function useMintCallback(tokenId?: BigNumberish): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const [{ data: accountData }] = useAccount();
  
  const contract = useContract({
    addressOrName: '0xB49cc5888979455411D31D38157F288566aCdb02',
    contractInterface: CyberDoge_ABI,
    signerOrProvider: signerData
  });

  return useMemo(() => {

    return {
      callback: async function onClaim(): Promise<any> {
        if (tokenId === '' || !tokenId || !contract || !signerData) return;

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