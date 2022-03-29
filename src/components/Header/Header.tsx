import React from "react";
import styled from "styled-components";
import ConnectWalletModal from "../ConnectWallet/ConnectWalletModal";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { TEXT } from "../../theme/theme";
import CyberDogeIcon from "../../assets/cyberdoge-icon.png";
import { Icon } from "../Icon/Icon";
import { StyledInternalLink } from "../../theme/components";
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
  padding: 30px 60px;
  max-width: 1000px;
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
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  &.${activeClassName} {
    text-decoration: underline;
  }

  :hover,
  :focus {
  }
`

export const Header = () => {
  return (
    <Container>
      <FlexRowContainer>
        <Icon size={60}>
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
