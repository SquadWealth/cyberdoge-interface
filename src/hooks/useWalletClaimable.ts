import { useMemo, useEffect, useState } from 'react';
import { useSigner, useContract, useBlockNumber } from 'wagmi';
import CyberDoge_ABI from '../constants/abis/CyberDoge.json';

export function useWalletClaimable(accountAddress?: string): any {
  const [{ data: signerData, error: signerError, loading: signerLoading }, getSigner] = useSigner();
  const contract = useContract({
    addressOrName: '0xB49cc5888979455411D31D38157F288566aCdb02',
    contractInterface: CyberDoge_ABI,
    signerOrProvider: signerData
  });
  const [claimable, setClaimable] = useState(undefined);

  useEffect(() => {
    if (accountAddress === '' || !contract || !signerData) return;

    (async () => {
      await contract
                  .walletClaimable(accountAddress)
                  .then((response: any) => {
                    setClaimable(response.toNumber());
                  })
    })();
  }, [contract, accountAddress, signerData]);

  return useMemo(() => {
    return claimable ? claimable : null;
  }, [claimable])
};