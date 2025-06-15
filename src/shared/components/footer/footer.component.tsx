import { useLocation } from "react-router-dom"
import { StyledFooter, StyledFooterLink } from "./footer.styles"
import AboutIcon from "shared/assets/svgs/question.icon.svg?react"
import SettingsIcon from "shared/assets/svgs/settings.icon.svg?react"
import HomeIcon from "shared/assets/svgs/home.icon.svg?react"

interface Props {
  isUserExist: boolean
  showLinks?: boolean
  showSwitcher?: boolean
  children?: React.ReactNode
}
// eslint-disable-next-line complexity
export const Footer: React.FC<Props> = ({
  isUserExist,
  showSwitcher = false,
  showLinks = false,
  children
}) => {
  const currentPath = useLocation().pathname
  const aboutIconTo =
    currentPath === "/about" ?
      <HomeIcon
        width='3rem'
        height='3rem'
      />
    : <AboutIcon
        width='3rem'
        height='3rem'
      />
  const aboutPathTo = currentPath === "/about" ? "/" : "/about"

  const settingsIconTo =
    currentPath === "/settings" ?
      <HomeIcon
        width='3rem'
        height='3rem'
      />
    : <SettingsIcon
        width='3rem'
        height='3rem'
      />
  const settingsPathTo = currentPath === "/settings" ? "/" : "/settings"

  return (
    <StyledFooter>
      {isUserExist ?
        <>
          {showLinks ?
            <StyledFooterLink to={aboutPathTo}>{aboutIconTo}</StyledFooterLink>
          : null}

          {showSwitcher ? children : null}

          {showLinks ?
            <StyledFooterLink to={settingsPathTo}>
              {settingsIconTo}
            </StyledFooterLink>
          : null}
        </>
      : null}
    </StyledFooter>
  )
}
