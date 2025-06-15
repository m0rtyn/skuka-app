export const showAppVersion = () => {
  console.info(
    `
%cVER: ${import.meta.env.VITE_VERSION}
NAME: ${import.meta.env.VITE_NAME}
`,
    "background: #222; color: #bada55"
  )
}
