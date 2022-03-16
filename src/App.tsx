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
          <TEXT.StandardBody m={'auto'}>
            This wallet does not currently hold a PlanckCat.
          </TEXT.StandardBody>
        ):(
          <>
            {/* <ImgWrapper>
              <img src={PlanckCat} />
            </ImgWrapper> */}
          </>
        )}
      </Body>
    </AppWrapper>
  );
}

export default App; 
