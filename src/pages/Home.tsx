import styled from 'styled-components';
import House_Background from '../assets/house.png';
import { StyledLink } from '../theme/components';
import { TEXT } from '../theme/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: auto auto auto auto;
  flex: 1;
`;

const Window = styled.div`
  display: flex;
  flex-direction: column;
  margin: 150px auto auto auto;

  ${({ theme }) => theme.mediaWidth.minSmall`
    margin: 200px auto auto auto;
  `};
`;

const ExternalButton = styled.button`
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.white};
  box-shadow: none;
  border: none;
  border-radius: 8px;
  height: 48px;
  width: 200px;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px auto;
`;

const Title = styled.div`
  font-size: 48px;
  text-align: center;
  color: ${({ theme }) => theme.text1};
  letter-spacing: 3px;
  cursor: ;
`;

const TwitterLink = styled(StyledLink)`
  color: ${({ theme }) => theme.text1};
`;

const OpenSeaLink = styled(StyledLink)`
  color: white;
`;

const CustomArtwork = styled.div`
  height: 200px;
  width: 100%;
  background-image: url(${House_Background});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
`;

export function Home() {
  return (
    <Container>
      <Window>
        <Title>CYBERDOGES</Title>
        <TEXT.SmallBody m={'4px auto'}>
          Created by &nbsp;
          <TwitterLink href={'https://twitter.com/paintedbynarz'} target="_blank">
            narz.eth
          </TwitterLink>
          ,&nbsp;
          <TwitterLink href={'https://twitter.com/misteropm_eth'} target="_blank">
            misteropm.eth
          </TwitterLink>
          ,&nbsp;
          <TwitterLink href={'https://twitter.com/8igboydiamonds'} target="_blank">
            bigboydiamonds.eth
          </TwitterLink>
        </TEXT.SmallBody>
        <ExternalButton>
          <OpenSeaLink href={'https://opensea.io/collection/cyberdoge-by-narz'}>View on OpenSea</OpenSeaLink>
        </ExternalButton>
        <CustomArtwork />
      </Window>
    </Container>
  );
}
