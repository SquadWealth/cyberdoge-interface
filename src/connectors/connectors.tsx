import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId } from '../constants/chains';
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.KOVAN,
  SupportedChainId.LOCALHOST
];

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});
