import styled from "styled-components";
import { useAccount } from "wagmi";
import { TEXT } from "../theme/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: black;
  height: 100vh;
  width: 100vw;
`;

export function Mint() {
  const [{ data: accountData }] = useAccount();

  return (
    <Container>
      {accountData?.address && (
        <TEXT.BoldHeader1 m={'auto'} color={'#f640fe8f'}>
          You have already minted a CyberDoge. Aroo!
        </TEXT.BoldHeader1>
      )}
      {!accountData && (
        <TEXT.BoldHeader1 m={'auto'} color={'#f640fe8f'}>
          Please connect wallet.
        </TEXT.BoldHeader1>
      )}
    </Container>
  )
};