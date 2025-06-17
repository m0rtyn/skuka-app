import { Link } from "react-router-dom"
import LogoWithName from "shared/assets/svgs/logo-with-name.svg?react"
import Logo from "shared/assets/svgs/skuka.svg?react"
import styles from "./about.module.css"
import { Footer } from "shared/components/footer/footer.component"

export const About = () => {
  return (
    <div className={styles.aboutPageWrapper}>
      <div className={styles.aboutSection}>
        {/* <LogoWithName
          width='18rem'
          height='18rem'
          style={{ marginBottom: "1rem" }}
        /> */}
        <Logo
          width='18rem'
          height='18rem'
          style={{ marginBottom: "1rem" }}
        />
        <small style={{ marginBottom: "1rem", color: "var(--c-gray)" }}>
          Session for impulsive minds
        </small>

        <p style={{ marginBottom: "0" }}>
          The app is designed to help you getting bored for longer periods each
          day by managing your "inner monkey.
        </p>

        <ul className={styles.styledList}>
          <li>
            <Link to='how-it-works'>How it works →</Link>
          </li>
          <li>
            <Link to='tutorial'>Tutorial →</Link>
          </li>
          <li>
            <a
              href='./CHANGELOG.txt'
              target='_blank'
              rel='noopener noreferrer'
            >
              Changelog ↗
            </a>
          </li>
        </ul>
      </div>
      <Footer
        isUserExist={true}
        showSwitcher={false}
        showLinks={true}
      ></Footer>
    </div>
  )
}
