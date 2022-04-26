import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ConnectWalletModal from '../ConnectWallet/ConnectWalletModal';
import { ConnectWallet } from '../ConnectWallet/ConnectWallet';
import { TEXT } from '../../theme/theme';
import CyberDogeIcon from '../../assets/cyberdoge-icon.png';
import { Icon } from '../Icon/Icon';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { enableLock, disableLock } from '../../utils/scrollLock';
import Burger from '../Hamburger/Hamburger';
import SlideMenu from '../SlideMenu/SlideMenu';

const Container = styled.div`
  display: block;
  position: fixed;
  width: 100vw;
  background-color: #ffe0fd;
`;

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 24px;
  margin: auto;

  ${({ theme }) => theme.mediaWidth.minSmall`
    max-width: 1100px;
    padding: 16px 60px;
  `};
`;

const ImageContainer = styled.img``;

const NavigationContainer = styled.div`
  display: none;

  ${({ theme }) => theme.mediaWidth.minSmall`
    display: flex;
    margin: auto;
  `};
`;

const activeClassName = 'ACTIVE';

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
`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation().pathname;
  const menuId = 'main-menu';

  // close menu when at new route
  useEffect(() => {
    if (open) {
      setOpen((open) => false);
    }
  }, [location]);

  // disable scroll when mobile menu open
  useEffect(() => {
    if (open) {
      enableLock();
    } else {
      disableLock();
    }
  }, [open]);

  return (
    <Container>
      <FlexRowContainer>
        <Icon height={60} width={200}>
          <ImageContainer src={CyberDogeIcon} />
        </Icon>

        <NavigationContainer>
          <StyledNavLink to={'/home'}>HOME</StyledNavLink>
          <StyledNavLink to={'/mint'}>MINT</StyledNavLink>
        </NavigationContainer>
        <ConnectWallet />

        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
        <SlideMenu open={open} />
      </FlexRowContainer>

      <ConnectWalletModal />
    </Container>
  );
};
