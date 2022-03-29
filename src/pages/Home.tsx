import styled from "styled-components";
import CyberDoge_Background from '../assets/cyberdoge-bg.jpg';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: auto auto auto auto;
  flex: 1;
  background-size: contain;
  background-image: url(${CyberDoge_Background});
  background-repeat: no-repeat;
  background-position: center;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  border: 1px solid black;
`;

const OpenSeaButton = styled.button`
  font-family: 'Fredoka', san-serif;
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

export function Home() {
  return (
    <Body>
      <CenterContainer>
        <OpenSeaButton>
          OpenSea
        </OpenSeaButton>
      </CenterContainer>
    </Body>
  )
}