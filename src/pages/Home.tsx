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

export function Home() {
  return (
    <Body>
    </Body>
  )
}