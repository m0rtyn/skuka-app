export const showAppVersion = () => {
  console.info(
    __VITE_VERSION__,
    __VITE_NAME__,
    `
%cVER: ${import.meta.env.VITE_VERSION} ${__VITE_VERSION__}
NAME: ${import.meta.env.VITE_NAME} ${__VITE_NAME__}
`,
    "background: #222; color: #bada55"
  )
}
