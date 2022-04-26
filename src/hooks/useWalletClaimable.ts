import { useMemo, useEffect, useState } from 'react';
import { useSigner, useContract, useBlockNumber } from 'wagmi';
import CyberDoge_ABI from '../constants/abis/CyberDoge.json';

export function useWalletClaimable(accountAddress?: string): boolean | undefined {
  const [{ data: signerData }] = useSigner();
  const [{ data: blockNumber }] = useBlockNumber({ watch: true });
  const contract = useContract({
    addressOrName: '0x851a3954074473b6fAFb5C2717D3C01094CC2698',
    contractInterface: CyberDoge_ABI,
    signerOrProvider: signerData,
  });
  const [claimable, setClaimable] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (accountAddress === '' || !contract || !signerData) return;
    (async () => {
      await contract
        .walletClaimable(accountAddress)
        .then((response: any) => {
          setClaimable(response);
        })
        .catch((error: any) => {
          console.log('useWalletClaimable error:', error);
        });
    })();
  }, [contract, accountAddress, signerData, blockNumber]);

  return useMemo(() => {
    return claimable;
  }, [claimable]);
}
