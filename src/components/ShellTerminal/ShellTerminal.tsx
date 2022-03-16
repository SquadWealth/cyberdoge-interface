import styled from "styled-components";
import "./ShellTerminal.css";
import CyberDoge from "../../assets/cyberdoge-icon.png"
// @ts-nocheck

const Tab = styled.div`
  background-color: black;
  width: 77px;
  padding: .5rem;
  display: flex;
  gap: 1rem;
  border-radius: 8px 8px 0 0;
`;

const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0;
`

const Command = styled.div`
  color: yellow;
`

const ImgWrapper = styled.div`
  display: flex;
  margin: auto;
  height: 200px;
  width: 200px;
`;

export const ShellTerminal = () => {
  return (
    <main>
      <div id="tabs">
        <Tab>Shell</Tab>
      </div>
      <Line>
        SH C:\win32{'>'} ...loading
      </Line>

      <Line>
        SH C:\win32{'>'} curl planckcat.lol -v
      </Line>

      <Command>
        VERBOSE: GET http://codepen.io/ with 0-byte payload
        VERBOSE: received -1-byte response of content type text/html; charset=utf-8
      </Command>

      <Line>
        SH C:\win32{'>'} Welcome to PlanckCat.lol
      </Line>

      <ImgWrapper>
        <img src={CyberDoge} />
      </ImgWrapper>

      <Line>
        SH C:\win32{'>'} <span id="blink">_</span>
      </Line>
    </main>
  );
};
