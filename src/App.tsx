import styled from 'styled-components';
import { Header } from './components/Header/Header';
import { DynamicCarousel } from './components/DynamicCarousel/DynamicCarousel';
import { Route, Redirect } from 'react-router-dom';
import { Home } from './pages/Home';
import { Mint } from './pages/Mint';

const AppWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
`;

const CarouselContainer = styled.div``;


function App() {
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
