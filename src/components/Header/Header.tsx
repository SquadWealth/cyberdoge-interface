import React from "react";
import styled from "styled-components";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { TEXT } from "../../theme/theme";
import CyberDogeIcon from "../../assets/cyberdoge-icon.png";
import { Icon } from "../Icon/Icon";
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  background-color: #ffe0fd;
`;

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 60px;
  max-width: 1100px;
  margin: auto;
`;

const ImageContainer = styled.img`
`;

const NavigationContainer = styled.div`
  display: flex;
  margin: auto;
`;

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 25px;
  font-weight: 500;
  padding: 8px 16px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  &.${activeClassName} {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

export const Header = () => {
  return (
    <Container>
      <FlexRowContainer>
        <Icon height={60} width={200}>
          <ImageContainer src={CyberDogeIcon} />
        </Icon>

        <NavigationContainer>
          <StyledNavLink to={'/home'}>
            HOME
          </StyledNavLink>
          <StyledNavLink to={'/mint'}>
            MINT
          </StyledNavLink>
        </NavigationContainer>
        
        <ConnectWallet />
      </FlexRowContainer>

      <ConnectWalletModal />
    </Container>
  )
};
