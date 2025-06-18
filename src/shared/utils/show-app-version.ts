export const showAppVersion = () => {
  console.info(
    window,
    window?.__VITE_VERSION__,
    window?.__VITE_NAME__,
    `
%cVER: ${import.meta.env.VITE_VERSION} ${window?.__VITE_VERSION__}
NAME: ${import.meta.env.VITE_NAME} ${window?.__VITE_NAME__}
`,
    "background: #222; color: #bada55"
  )
}
