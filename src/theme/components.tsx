import { Link } from 'react-router-dom'
import styled  from 'styled-components/macro'

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)<{
  noEffect?: boolean
  active?: boolean
}>`
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  font-weight: 500;

  :hover {
    text-decoration: ${({ noEffect }) => (noEffect ? 'none' : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ noEffect }) => (noEffect ? 'none' : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

export const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`
