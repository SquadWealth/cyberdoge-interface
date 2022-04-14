import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { TEXT } from '../theme/theme'
import { useWalletClaimable } from '../hooks/useWalletClaimable'
import { useMintCallback } from '../hooks/useMintCallback'
import { StyledLink } from '../theme/components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: black;
  height: 100vh;
  width: 100vw;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-bottom: 100px;
`

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
`

const OpenSeaLink = styled(StyledLink)`
  color: white;
`

export function Mint() {
  const [{ data: accountData }] = useAccount()
  const claimable = useWalletClaimable('0x8e8b3e19717A5DDCfccce9Bf3b225E61efDD7937')
  const { callback: mintCallback } = useMintCallback(claimable ? claimable : '')

  const [{ attemptingTransaction, transactionErrorMessage, transactionHash }, setMintState] = useState<{
    attemptingTransaction: boolean
    transactionErrorMessage: string | undefined
    transactionHash: undefined
  }>({
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  })

  const handleMint = useCallback(() => {
    if (!mintCallback) return
    setMintState({
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })
    mintCallback()
      .then((response: any) => {
        setMintState({
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: response,
        })
      })
      .catch((error: any) => {
        setMintState({
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [mintCallback])

  return (
    <Container>
      {claimable === undefined && accountData && <Content>Checking for doges to adopt...</Content>}
      {claimable === null && accountData && <Content>You have no doge available to adopt.</Content>}
      {claimable && accountData && (
        <Content>
          <TEXT.StandardBody m={'auto auto 0 auto'}>You have 1 doge available to adopt. Aroo!</TEXT.StandardBody>
          {attemptingTransaction && <MintButton>Processing adoption...</MintButton>}
          {transactionHash !== undefined && (
            <MintButton>
              <OpenSeaLink href={'https://opensea.io/collection/cyberdoge-by-narz'}>
                #{claimable} Adopted! View on OpenSea.
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
  )
}
