import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/actions'
import { Icon } from '../Icon/Icon'
import { TEXT } from '../../theme/theme'
import { useConnect, useAccount } from 'wagmi'
import Modal from '../Modal/Modal'
import MetaMaskLogo from '../../assets/metamask-icon.png'

const ProviderSelectionButton = styled.button`
  display: flex;
  background: #f640fe66;
  border: 3px solid #f640fe8f;
  border-radius: 8px;
  color: #f2f2f2;
  font-size: 12px;
  cursor: pointer;
  padding: 12px;
  width: 100%;
  font-family: 'Fredoka', san-serif;
  margin-top: 12px;

  ${({ theme }) => theme.mediaWidth.minSmall`
    :hover, :active {
      background: #f640fe8f;
    }
  `}
`

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
`

const SelectionContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function ConnectWalletModal() {
  const [{ data: connectData, error: connectError }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true })
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  useEffect(() => {
    if (accountData && walletModalOpen) {
      toggleWalletModal()
    }
  }, [walletModalOpen, accountData, toggleWalletModal])

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <ModalContentContainer>
        <TEXT.BoldHeader1 color={'#f640fe8f'} textAlign={'center'} letterSpacing={'1px'}>
          Connect Wallet
        </TEXT.BoldHeader1>

        {connectData.connectors.map((x) => (
          <ProviderSelectionButton disabled={!x.ready} key={x.id} onClick={() => connect(x)}>
            <SelectionContentContainer>
              <Icon height={20} width={20}>
                <img src={MetaMaskLogo} alt={'Metamask Icon'} />
              </Icon>
              <TEXT.StandardBody m={'0 12px'}>
                {x.name}
                {!x.ready && ' (unsupported)'}
              </TEXT.StandardBody>
            </SelectionContentContainer>
          </ProviderSelectionButton>
        ))}
      </ModalContentContainer>
    </Modal>
  )
}
