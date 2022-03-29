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
  font-family: 'Paytone One', sans-serif;
  background: #f856f8;
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


export const ConnectWallet = () => {
  const [{ data: connectData, error: connectError }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();

  if (accountData) {
    return (
      <Container>
        <ConnectWalletButton>
          {shortenAddress(accountData.address)}
        </ConnectWalletButton>
      </Container>
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
    </Container>
  )
}