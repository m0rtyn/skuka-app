import { PageWrapper } from "./about-page.styles"
import { Outlet } from "react-router-dom"
import { Header } from "features/home/components/header/header.component"

export const AboutPage = () => {
  return (
    <PageWrapper>
      <Header />
      <Outlet />
    </PageWrapper>
  )
}
