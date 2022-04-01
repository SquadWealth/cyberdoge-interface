import { useState, useCallback } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { TEXT } from "../theme/theme";
import { useWalletClaimable } from "../hooks/useWalletClaimable";
import { useMintCallback } from "../hooks/useMintCallback";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: black;
  height: 100vh;
  width: 100vw;
`;

const MintButton = styled.button`
  background: ${({theme}) => (theme.bg2)}; 
  border: 2px solid ${({theme}) => (theme.bg2)};
  border-radius: 20px;
  color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
  padding: 12px;
  width: 200px;
  box-shadow: 0 0 5px ${({theme}) => (theme.bg2)};
  margin: 24px auto auto auto;
`;

export function Mint() {
  const [{ data: accountData }] = useAccount();
  const claimable = useWalletClaimable('0x8e8b3e19717A5DDCfccce9Bf3b225E61efDD7937');
  const { callback: mintCallback } = useMintCallback(claimable ? claimable : '');
  console.log('claimable: ', claimable);

  const [{ attemptingTransaction, transactionErrorMessage, transactionHash }, setMintState] = useState<{
    attemptingTransaction: boolean;
    transactionErrorMessage: string | undefined;
    transactionHash: undefined,
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
      transactionHash: undefined
    })
    mintCallback()
      .then((response: any) => {
        setMintState({
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: response
        })
        console.log('handleMint response: ', response);
      })
      .catch((error: any) => {
        setMintState({
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined
        })
        console.error('handleMint error: ', error);
      })
  }, [mintCallback]);

  return (
    <Container>
      {claimable === undefined && (
        <TEXT.StandardBody m={'auto'}>
          Checking for claimable tokens...
        </TEXT.StandardBody>
      )}
      {claimable === null && (
        <TEXT.StandardBody m={'auto'}>
          You have no tokens available to mint.
        </TEXT.StandardBody>
      )}
      {claimable && (
        <>
          <TEXT.StandardBody m={'auto auto 0 auto'}>
            You have 1 token available to claim.
          </TEXT.StandardBody>
          {attemptingTransaction && (
            <MintButton>
              Minting...
            </MintButton>
          )}
          {transactionHash !== undefined && (
            <MintButton>
              Minted!
            </MintButton>
          )}
          {!attemptingTransaction && transactionHash === undefined && (
            <MintButton onClick={handleMint}>
              Mint
            </MintButton>
          )}
        </>
      )}
      {!accountData && (
        <TEXT.BoldHeader1 m={'auto'} color={'#f640fe8f'}>
          Please connect wallet.
        </TEXT.BoldHeader1>
      )}
    </Container>
  )
};