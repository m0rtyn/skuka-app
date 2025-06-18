export const showAppVersion = () => {
  console.info(
    `
%cVER: ${__VITE_VERSION__}
NAME: ${__VITE_NAME__}
`,
    "background: #222; color: #bada55"
  )
}
