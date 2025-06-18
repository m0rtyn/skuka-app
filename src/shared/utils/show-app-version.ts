export const showAppVersion = () => {
  console.info(
    `
%cVER: ${import.meta.env.VITE_VERSION} ${window?.VITE_VERSION}
NAME: ${import.meta.env.VITE_NAME} ${window?.VITE_NAME}
`,
    "background: #222; color: #bada55"
  )
}
