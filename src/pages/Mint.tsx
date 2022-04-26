import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { TEXT } from '../theme/theme';
import { useWalletClaimable } from '../hooks/useWalletClaimable';
import { useMintCallback } from '../hooks/useMintCallback';
import { StyledLink } from '../theme/components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: black;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 100px;
`;

const MintButton = styled.button`
  background: ${({ theme }) => theme.bg2};
  border: 2px solid ${({ theme }) => theme.bg2};
  border-radius: 20px;
  color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
  padding: 12px;
  width: 300px;
  box-shadow: 0 0 5px ${({ theme }) => theme.bg2};
  margin: 24px auto auto auto;
`;

const OpenSeaLink = styled(StyledLink)`
  color: white;
`;

export function Mint() {
  const [{ data: accountData }] = useAccount();
  const canClaim = useWalletClaimable(accountData ? accountData.address : '')
  const { callback: mintCallback } = useMintCallback(canClaim ? canClaim : false);

  const [{ attemptingTransaction, transactionErrorMessage, transactionHash }, setMintState] = useState<{
    attemptingTransaction: boolean;
    transactionErrorMessage: string | undefined;
    transactionHash: undefined;
  }>({
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  });

  const handleMint = useCallback(() => {
    if (!mintCallback) return;
    setMintState({
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    });
    mintCallback()
      .then((response: any) => {
        setMintState({
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: response,
        });
      })
      .catch((error: any) => {
        setMintState({
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        });
      });
  }, [mintCallback]);

  return (
    <Container>
      {canClaim === undefined && accountData && <Content>Checking for doges to adopt...</Content>}
      {canClaim === false && accountData && <Content>You have no doge available to adopt.</Content>}
      {canClaim && accountData && (
        <Content>
          <TEXT.StandardBody m={'auto auto 0 auto'}>You have 1 doge available to adopt. Aroo!</TEXT.StandardBody>
          {attemptingTransaction && <MintButton>Processing adoption...</MintButton>}
          {transactionHash !== undefined && (
            <MintButton>
              <OpenSeaLink href={'https://opensea.io/collection/cyberdoge-by-narz'}>
                CyberDoge Adopted! View on OpenSea.
              </OpenSeaLink>
            </MintButton>
          )}
          {!attemptingTransaction && transactionHash === undefined && (
            <MintButton onClick={handleMint}>Adopt</MintButton>
          )}
        </Content>
      )}

      {!accountData && (
        <Content>
          <TEXT.BoldHeader1 m={'auto'} color={'#f640fe8f'}>
            Please connect wallet.
          </TEXT.BoldHeader1>
        </Content>
      )}
    </Container>
  );
}
