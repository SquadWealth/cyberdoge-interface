import React from 'react';
import styled from 'styled-components';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet';
import { Header } from './components/Header/Header';
import { TEXT } from './theme/theme';
import { useAccount, useConnect } from 'wagmi';
import PlanckCat from './assets/planck-cat.png';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 50px auto auto auto;
  flex: 1;
`;

const ImgWrapper = styled.div`
  display: flex;
  margin: auto;
  height: 200px;
  width: 200px;
`;

function App() {
  const [{ data: accountData }] = useAccount();

  console.log('accountData: ', accountData);

  return (
    <AppWrapper>
      <Header />
      <Body>
        { accountData ? (
          <TEXT.BoldHeader1 m={'auto'} color={'#f640fe8f'}>
            You have already minted a CyberDoge. Aroo!
          </TEXT.BoldHeader1>
        ):(
          <TEXT.StandardHeader1 m={'auto'}>
            CyberDoge Mint Page
          </TEXT.StandardHeader1>
        )}
      </Body>
    </AppWrapper>
  );
}

export default App; 
