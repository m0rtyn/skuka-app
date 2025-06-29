/* eslint-disable max-lines */
import { createGlobalStyle, css } from "styled-components"

// @ts-nocheck
const CSSCustomProperties = css`
  :root {
    /* NOTE:
  Custom colors scheme
  the conrast of the colors gradualy increases relatively to base color
  */
    --c-background: ${({ theme }) => theme.background};
    --c-foreground: ${({ theme }) => theme.foreground};

    --c-darken-gray: ${({ theme }) => theme.elementBg};
    --c-dark-gray: #656565;
    --c-gray: ${({ theme }) => theme.elementFg};

    --c-red: #fea490;
    --c-orange: #ffc26c;
    --c-yellow: #ccf994;
    --c-green: #5ff4ad;
    --c-cyan: #3ff0ed;
    --c-blue: #7cb1ff;
    --c-purple: #ff66f0;
    --c-magenta: #ffd8eb;
    --c-ultrared: #ffe8e8;

    --header-height: 60px;
    --link-bg: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect x='0' y='.5' width='1' height='.5' fill='rgba(249, 248, 246, .5)'/%3E%3C/svg%3E");
    --link-bg-focus: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect x='0' y='.5' width='1' height='.5' fill='rgba(255, 78, 35 , .5)'/%3E%3C/svg%3E");
    --font-mono: "Inter", "Courier New", "Liberation Mono", monospace;
    --font-family:
      "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`

export const GlobalStyles = createGlobalStyle`
${CSSCustomProperties}

*,
*::before,
*::after {
  box-sizing: border-box;
  line-height: 1.5;
  backface-visibility: hidden;
}

html {
  height: 100%;
  font-size: 8px;
}

body {
  background-color: var(--c-background) !important;
  user-select: none;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  
  height: 100%;
  overflow-y: hidden;
  margin: 0 auto;
  font-size: 2rem;
  color: var(--c-foreground);
  max-width: 60rem;
  transition: background-color 0.3s ease-out;
}

#root {
  height: 100%;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-variant-ligatures: common-ligatures;
  text-rendering: optimizeLegibility;
  font-variant-numeric: tabular-nums;
}

img {
  display: block;
  height: auto;
}

img,
canvas,
iframe,
video,
/* svg, TEMP FIX */
select,
textarea {
  max-width: 100%;
}

[hidden] {
  display: none;
}

/* base */

/* typography */
h1 {
  font-size: xxx-large;
  font-weight: 500;
}

ol,
ul {
  padding: 0;
}

li::marker {
  color: var(--c-gray);
}

li + li {
  margin-top: 1rem;
}

p {
  margin-bottom: 1.5rem;
}

blockquote {
  text-align: right;
  font-size: larger;
  margin-inline-start: 0;
  margin-inline-end: 0;
  max-width: 40rem;
  margin-left: auto;
}

cite {
  display: block;
  margin-top: 1rem;
  opacity: 0.8;
  font-size: medium;
}

cite::before {
  content: "— ";
}

a {
  color: var(--c-foreground);

  text-decoration: none;
  background-image: var(--link-bg);
  background-repeat: repeat-x;
  background-position: left bottom;

  transition: color 0.3s;
}

a[href^="http"]::after {
  content: " ↗";
  user-select: none;
  pointer-events: none;
}

/* buttons */
button {
  position: relative;
  display: inline-block;
  color: var(--c-foreground);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: large;

  transition: transform 0.1s;
  background-color: var(--c-blue);
}

button::before {
  display: inline-block;
  content: "";
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  z-index: -1;
  border-radius: 8px;
  background-color: inherit;
  pointer-events: none;

  opacity: 0.3;

  transform: scale(0);
  transition: transform 1s;
}

button:focus {
  outline: none;
}

button:focus::before {
  transform: scale(1);
  transition-duration: 0s;
}

button:active {
  outline: none;
  transform: scale(0.98);
}

button:disabled {
  filter: grayscale(100%);
  opacity: 0.8;
}

button[aria-busy="true"][tabindex="-1"] {
  color: transparent;
  user-select: none;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle stroke='white' stroke-width='2' stroke-linecap='round' stroke-dasharray='30,100' cx='10' cy='10' r='8' fill='none'%3E%3CanimateTransform attributeName='transform' type='rotate' dur='1s' repeatCount='indefinite' from='0 10 10' to='360 10 10'/%3E%3C/circle%3E%3C/svg%3E");
}

button[type="submit"] {
  background-color: var(--c-green);
}

button[type="submit"]::after,
button:not([type])::after {
  content: "↑";
  user-select: none;
  pointer-events: none;
}

button[type="reset"] {
  background-color: var(--c-red);
}

button[type="reset"]::after {
  content: "×";
  user-select: none;
  pointer-events: none;
}

/* nav menu (a special element) */
nav ul {
  padding: 0;
  list-style-type: none;
  word-spacing: 1rem;
  white-space: nowrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: large;
}

nav li {
  display: inline;
}

nav li:first-child {
  padding-left: 2rem;
}

nav li:last-child {
  padding-right: 2rem;
}

nav a {
  word-spacing: initial;
}

/* graphics */
figure {
  display: inline-block;
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin-left: auto;
  margin-right: auto;
}

figcaption {
  text-align: center;
  margin: 1rem 0;
  opacity: 0.8;
}

/* forms, inputs */
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

form > * + * {
  margin-top: 1rem;
}

label > br ~ * {
  margin-top: 0.25rem;
}

input,
select {
  color: var(--c-foreground);
}

input[aria-busy="true"] {
  cursor: wait;
  filter: grayscale(100%);
  opacity: 0.8;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="search"],
input[type="number"],
input[type="date"],
input[type="tel"],
select,
textarea {
  display: inline-block;
  background-color: var(--c-darken-gray);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: medium;
  transition: box-shadow 0.3s;
}

/* input[type="radio"],
input[type="checkbox"] {
	transition: box-shadow .3s;
} */

/* input[type="text"]:hover,
input[type="email"]:hover,
input[type="password"]:hover,
input[type="search"]:hover,
input[type="number"]:hover,
input[type="date"]:hover,
input[type="tel"]:hover,
select,
textarea {
	transition-duration: 0s;
} */

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="search"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
select:focus,
textarea:focus,
input[type="text"]:active,
input[type="email"]:active,
input[type="password"]:active,
input[type="search"]:active,
input[type="number"]:active,
input[type="date"]:active,
input[type="tel"]:active,
input[type="color"]:active,
select:active,
textarea:active {
  outline: none;
  transition-duration: 0s;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.09),
    0 0 0 4px var(--c-blue-focus);
}

input:disabled,
select:disabled,
textarea:disabled {
  filter: grayscale(100%);
  opacity: 0.8;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

fieldset {
  background-color: var(--c-darken-gray);
  border: none;
  border-radius: 5px;
  margin-inline-start: 0;
  padding-block-start: 0;
  padding: 0.5rem 1rem;
  margin-top: 2.75rem;
  position: relative;
}

fieldset > legend {
  margin-bottom: 1rem;
  top: -0.25rem;
  left: 0;
  position: absolute;
  transform: translateY(-100%);
}

input[type="checkbox"]:first-of-type {
  margin-left: 0;
}

form > footer {
  display: flex;
  margin: -0.5rem;
  margin-top: 0.5rem;
}

form > footer > * {
  margin: 0.5rem;
}

textarea {
  min-height: 10rem;
  min-width: 10rem;
  max-width: min(calc(100vw - 4rem), 56rem);
  max-height: 30rem;
}

input[type="color"] {
  display: inline-block;
  border: none;
  border-radius: 5px;
  overflow: hidden;
  padding: 0;
  transition: box-shadow 0.3s;
  min-height: 2rem;
  min-width: 5rem;
}

input[type="file"] {
  font-size: medium;
}

svg[viewBox="0 0 24 24"] {
  width: 3rem;
  height: 3rem;
}
`
