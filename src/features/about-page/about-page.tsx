import { PageWrapper } from "./about-page.styles"
import { Outlet } from "react-router-dom"
import { Header } from "features/home/components/header/header.component"
import { Footer } from "shared/components/footer/footer.component"

export const AboutLayout = () => {
  return (
    <PageWrapper>
      <Header />
      <Outlet />
      <Footer isUserExist={true} />
    </PageWrapper>
  )
}
