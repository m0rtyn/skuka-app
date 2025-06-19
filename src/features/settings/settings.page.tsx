import { Header } from "features/home/components/header/header.component"
import { Footer } from "shared/components/footer/footer.component"
import { PageWrapper } from "features/about-page/about-page.styles"
import { SettingsControls } from "./components/settings-controls"
import { useEffect } from "react"
import { useAppDispatch } from "app/store"
import { sendSettingsThunk } from "./store/settings.thunks"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "app/firebase-init"

export const SettingsPage = () => {
  const dispatch = useAppDispatch()
  const [user] = useAuthState(auth)

  /** NOTE: to update settings only when page changing from settings */
  useEffect(() => {
    if (!user) return
    return () => {
      dispatch(sendSettingsThunk(user.uid))
    }
  }, [])

  return (
    <PageWrapper>
      <Header />

      <SettingsControls />

      <Footer
        isUserExist={true}
        showLinks={true}
        showSwitcher={false}
      />
    </PageWrapper>
  )
}
