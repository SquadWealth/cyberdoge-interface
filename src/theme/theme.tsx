import React, { useMemo } from 'react';
import { Text, TextProps as TextPropsOriginal } from 'rebass';
import styled, { 
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider
} from 'styled-components';
import { Colors } from "./styled";
import { useIsDarkMode } from '../state/user/hooks';

export const MEDIA_WIDTHS = {
  minExtraSmall: 576,
  minSmall: 768,
  minMedium: 992,
  minLarge: 1400
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (min-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any;

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white: '#FFFFFF',
    black: '#000000',

    // text
    text1: darkMode ? '#eb71eb' : '#000000',
    text2: '#F2F2F2',
    text3: '#0B0F1C',
    text4: '#12B4FF',

    // backgrounds
    bg1: darkMode ? '#F2F2F2' : '#F7F7F7',
    bg2: darkMode ? '#eb71eb' : '#0B0F1C',
    bg3: darkMode ? '#ffe0fd' : '#edeef2',

    //misc
    white1: '#f2f2f2',
    blue1: darkMode ? '#2172E5' : '#0068FC',
    blue2: '#56CCF2',
    blue3: '#12B4FF',
    red1: darkMode ? '#FF4343' : '#DA2D2B',
    green1: darkMode ? '#27AE60' : '#007D35',  
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    mediaWidth: mediaWidthTemplates,
  }
};

export default function ThemeProvider({ children } : { children: React.ReactNode }) {
  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
};

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

type TextProps = Omit<TextPropsOriginal, 'css'>

export const TEXT = {
  AdjustableSize(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  Menu(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  StandardHeader1(props: TextProps) {
    return <TextWrapper fontSize={20} fontWeight={400} {...props} />
  },
  BoldHeader1(props: TextProps) {
    return <TextWrapper fontSize={20} fontWeight={700} {...props} />
  },
  StandardBody(props: TextProps) {
    return <TextWrapper fontSize={16} fontWeight={400} {...props} />
  },
  BoldStandardBody(props: TextProps) {
    return <TextWrapper fontSize={16} fontWeight={700} {...props} />
  },
  SmallBody(props: TextProps) {
    return <TextWrapper fontSize={14} fontWeight={400} {...props} />
  },
  BoldSmallBody(props: TextProps) {
    return <TextWrapper fontSize={14} fontWeight={700} {...props} />
  },
  Supplemental(props: TextProps) {
    return <TextWrapper fontSize={12} fontWeight={400} {...props} />    
  },
  BoldSupplemental(props: TextProps) {
    return <TextWrapper fontSize={12} fontWeight={700} {...props} />    
  }
}
