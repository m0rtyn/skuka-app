import styles from "./how-it-works.module.css"
import { Footer } from "shared/components/footer/footer.component"
import { useAppSelector } from "app/store"
import { getProgressionByType } from "shared/utils"

export const HowItWorks = () => {
  return (
    <>
      <div className={styles.body}>
        <FirstStep />
        <SecondStep />
        <ThirdStep />
      </div>
      <Footer
        isUserExist={true}
        showLinks={true}
      />
    </>
  )
}

export const FirstStep = () => {
  return (
    <>
      <h1>How it works</h1>
      <p>
        This is an <em>exponential</em> timer that helps relieve boredom by
        counting down with progressively longer stretches of time.
      </p>
      <p>
        It also provides session statistics that give instant feedback on the
        long-term positive effects of session.
      </p>
    </>
  )
}

export const SecondStep = () => {
  const progressionType = useAppSelector(state => state.settings.progression)
  const progression = getProgressionByType(progressionType)

  return (
    <>
      <h2>The Duration Increases Gradually</h2>
      <p>
        Once you click, the timers go one after another. Each new timer informs
        you of how long to getting bored for the next stage.
      </p>
      <p>
        The increase occurs according to a sequence that has exponential growth.
        This is Fibonacci sequence, but very similar.
      </p>
      <p>
        The full sequence in minutes (it depends on the settings):
        <br />
        <code
          style={{
            textAlign: "center",
            color: "var(--c-foreground)",
            margin: "0.5em 0",
            fontSize: "2.5rem",
            display: "block",
            width: "100%"
          }}
        >
          {" "}
          {progression
            .slice(1, 10)
            .map(n => n / 60)
            .join(", ")}
        </code>
      </p>
    </>
  )
}

export const ThirdStep = () => {
  return (
    <>
      <h2>So What's The Deal?</h2>
      <p>
        The magic here is that the focus is on the extra session time, not the
        total duration. Such small steps make it feel effortless.
      </p>
      <p>
        The result is more than it seems. The gradual build-up helps you stay in
        the session longer, thanks to the cognitive trick involved.
      </p>
    </>
  )
}
