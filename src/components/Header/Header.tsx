import React from "react";
import styled from "styled-components";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { TEXT } from "../../theme/theme";
import CyberDogeIcon from "../../assets/cyberdoge-icon.png";
import { Icon } from "../Icon/Icon";

const Container = styled.div`
  display: block;
  width: 100%;
  background-color: #f640fe29;
`;

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 60px;
  max-width: 1000px;
  margin: auto;
`;

const ImageContainer = styled.img`
`;


export const Header = () => {
  return (
    <Container>
      <FlexRowContainer>
          <Icon size={60}>
            <ImageContainer src={CyberDogeIcon} />
          </Icon>
        <ConnectWallet />
      </FlexRowContainer>

      <ConnectWalletModal />
    </Container>
  )
};
