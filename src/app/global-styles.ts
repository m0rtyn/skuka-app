/* eslint-disable max-lines */
import { createGlobalStyle, css } from "styled-components"

// @ts-nocheck
const CSSCustomProperties = css`
  :root {
    /* NOTE:
      Custom colors scheme
      the contrast of the colors gradualy increases relatively to base color
    */
    --c-background: ${({ theme }) => theme.background};
    --c-foreground: ${({ theme }) => theme.foreground};

    --header-height: 60px;
    --link-bg: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect x='0' y='.5' width='1' height='.5' fill='rgba(249, 248, 246, .5)'/%3E%3C/svg%3E");
    --link-bg-focus: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect x='0' y='.5' width='1' height='.5' fill='rgba(255, 78, 35 , .5)'/%3E%3C/svg%3E");
  }
`

export const GlobalStyles = createGlobalStyle`
${CSSCustomProperties}
`
