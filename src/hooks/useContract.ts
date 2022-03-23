import { useMemo } from "react";
import { useActiveWeb3React } from "./web3";
import { Contract } from "@ethersproject/contracts";
import { getContract } from "../utils/contract";
import { Erc20 as ERC20 } from "../constants/abis/types";
import ERC20_ABI from '../constants/abis/erc20.json';

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]) as T;
};

export function useMulticall2Contract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, false);
};

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
};
