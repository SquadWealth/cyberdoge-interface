import { useMemo, useEffect, useState } from 'react';
import { useSigner, useContract, useBlockNumber } from 'wagmi';
import CyberDoge_ABI from '../constants/abis/CyberDoge.json';

export function useCanClaim(accountAddress?: string): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const contract = useContract({
    addressOrName: '0x2A2e181Cc177974c5D013240C34E1dEf1A3CC31a',
    contractInterface: CyberDoge_ABI,
    signerOrProvider: signerData
  });
  const [claimable, setClaimable] = useState(null);

  useEffect(() => {
    if (!contract || !signerData) return;

    (async () => {
      setClaimable(await contract.walletClaimable(accountAddress))
    })();
  }, [contract, accountAddress, signerData]);

  return useMemo(() => {
    return claimable ? claimable : null;
  }, [claimable])
};