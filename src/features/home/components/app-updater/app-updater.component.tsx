import React, { useCallback, useEffect, useRef } from "react"
// import {
//   withServiceWorkerUpdater,
//   ServiceWorkerUpdaterProps,
//   LocalStoragePersistenceService
// } from "@3m1/service-worker-updater"
import { StyledUpdateButton, StyledAppVersion } from "./app-updater.styles"

// const AppUpdater: React.FC<ServiceWorkerUpdaterProps> = ({
//   newServiceWorkerDetected,
//   onLoadNewServiceWorkerAccept
// }) => {
export const AppUpdater: React.FC = () => {
  const appVersion = useRef("")

  useEffect(() => {
    appVersion.current = `v${__VITE_VERSION__}`
  }, [])

  const handleRefresh = useCallback((): void => {
    window?.location.reload()
  }, [])

  return (
    <>
      <StyledAppVersion
        type='button'
        onClick={handleRefresh}
      >
        {appVersion.current}
      </StyledAppVersion>
      {/* {newServiceWorkerDetected ?
        <StyledUpdateButton
          type='button'
          onClick={onLoadNewServiceWorkerAccept}
        >
          Update
        </StyledUpdateButton>
      : appVersion.current ?
        <StyledAppVersion
          type='button'
          onClick={handleRefresh}
        >
          {appVersion.current} ↻
        </StyledAppVersion>
      : null} */}
    </>
  )
}

// export default withServiceWorkerUpdater(AppUpdater, {
//   log: () => console.warn("App updated!"),
//   persistenceService: new LocalStoragePersistenceService("skukaApp")
// })
