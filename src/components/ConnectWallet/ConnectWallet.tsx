import styled from 'styled-components';
import ThreeDots from 'react-loader-spinner';
import { useAccount, useConnect } from 'wagmi';
import { shortenAddress } from '../../utils/web3';
import { useWalletModalToggle, useModalOpen } from '../../state/application/hooks';
import { ApplicationModal } from '../../state/application/actions';

const Container = styled.div`
  display: flex;
`;

const ConnectWalletButton = styled.button`
  font-family: 'Fredoka', san-serif;
  background: #f640fe8f;
  box-shadow: none;
  border: none;
  border-radius: 8px;
  color: #f2f2f2;
  height: 48px;
  width: 200px;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  margin: auto;
`;

const Web3WalletDisplay = styled.div`
  font-family: 'Fredoka', san-serif;
  background: #56CCF2;
  color: #f2f2f2;
  border: none;
  border-radius: 8px;
  box-shadow: none;
  font-size: 12px;
  padding: 12px;
`


export const ConnectWallet = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();

  if (accountData) {
    return (
      // <div>
      //   <img src={accountData?.ens?.avatar ?? undefined} alt="ENS Avatar" />
      //   <div>
      //     {accountData.ens?.name
      //       ? `${accountData.ens?.name} (${accountData.address})`
      //       : accountData.address}
      //   </div>
      //   <div>Connected to {accountData?.connector?.name}</div>
      //   <button onClick={disconnect}>Disconnect</button>
      // </div>
      <Web3WalletDisplay>
        {shortenAddress(accountData.address)}
      </Web3WalletDisplay>
    )
  }

  return (
    <Container>
      {walletModalOpen ? (
        <ConnectWalletButton>
          ...loading
        </ConnectWalletButton>
      ):(
        <ConnectWalletButton onClick={toggleWalletModal}>
          Connect Wallet
        </ConnectWalletButton>
      )}

      {/* {connectData.connectors.map((x) => (
        <button disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
          {x.name}
          {!x.ready && ' (unsupported)'}
        </button>
      ))}

      {connectError && <div>{connectError?.message ?? 'Failed to connect'}</div>} */}
    </Container>
  )
}