import styled from 'styled-components';
import { ConnectWallet } from './components/ConnectWallet/ConnectWallet';
import { Header } from './components/Header/Header';
import { DynamicCarousel } from './components/DynamicCarousel/DynamicCarousel';
import { TEXT } from './theme/theme';
import { useAccount, useConnect } from 'wagmi';
import { Route, Switch, Redirect } from 'react-router-dom';
import CyberDoge_Background from './assets/cyberdoge-bg.jpg';
import { Home } from './pages/Home';
import { Mint } from './pages/Mint';

const AppWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
`;
  
const CarouselContainer = styled.div`

`;

const MintButton = styled.button`
  background: #f640fe;
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

function App() {
  const [{ data: accountData }] = useAccount();

  console.log('accountData: ', accountData);

  return (
    <AppWrapper>
      <Header />
      <Route exact strict path="/" render={() => <Redirect to="/home" />} />
      <Route exact strict path="/home" component={Home} />
      <Route exact strict path="/mint" component={Mint} />
      <CarouselContainer>
        <DynamicCarousel />
      </CarouselContainer>
    </AppWrapper>
  );
}

export default App; 
