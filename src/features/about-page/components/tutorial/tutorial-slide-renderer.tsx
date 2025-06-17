// import { SlideRenderProps } from "react-swipeable-views-utils"
import styled from "styled-components"
import styles from "./tutorial-slide-renderer.module.css"

// export const tutorialSlideRenderer = ({ index }: SlideRenderProps) => {
//   switch (index) {
//     case 0:
//       return <TutorialFirstStep key={index} />
//     case 1:
//       return <TutorialSecondStep key={index} />
//     case 2:
//       return <TutorialThirdStep key={index} />
//     case 3:
//       return <TutorialFourthStep key={index} />
//     case 4:
//       return <TutorialFifthStep key={index} />
//     default:
//       return <p>This step doesn't yet exist 🤷‍♂️</p>
//   }
// }

const TutorialFirstStep: React.FC = () => {
  return (
    <div className={styles.styledSwipeableView}>
      <h2>Start of the App</h2>
      <div className={styles.tutorialDemoWrapper}>
        {/* <TimerButton
          handleTimerClick={() => {}}
          isTimerStarted={false}
          authLoading={false}
        >
          <Countdown seconds={0 as Second} />
        </TimerButton> */}
      </div>
      <p>You start the application and see a button with a timer.</p>
    </div>
  )
}

const TutorialSecondStep: React.FC = () => {
  return (
    <div className={styles.styledSwipeableView}>
      <h2>The Timer</h2>
      <div className={styles.tutorialDemoWrapper}>
        {/* <TimerButton
          handleTimerClick={() => {}}
          isTimerStarted={true}
          authLoading={false}
        >
          {<Countdown seconds={1 as Second} />}
        </TimerButton> */}
      </div>
      <p>
        You click on the button and the session begins. A one-minute countdown
        timer will appear.
      </p>
    </div>
  )
}

const TutorialThirdStep: React.FC = () => {
  return (
    <div className={styles.styledSwipeableView}>
      <h2>Increasing Stages</h2>
      <div className={styles.tutorialDemoWrapper}>
        {/* <TimerButton
          handleTimerClick={() => {}}
          isTimerStarted={true}
          authLoading={false}
        >
          {<Countdown seconds={6540 as Second} />}
        </TimerButton> */}
      </div>
      <p>
        The first stages are short, and then the duration of each stage grows.
      </p>
    </div>
  )
}

const TutorialFourthStep: React.FC = () => {
  return (
    <div className={styles.styledSwipeableView}>
      <h2>End of session</h2>

      <div className={styles.tutorialDemoWrapper}>
        {/* <TimerButton
          handleTimerClick={() => {}}
          isTimerStarted={true}
          authLoading={false}
        >
          <Countdown seconds={0 as Second} />
          <div
            style={{
              justifySelf: "end",
              alignSelf: "center",
              height: "100%",
              display: "flex",
              alignItems: "center",
              marginBottom: "6px"
            }}
          >
            <CheckMark animation={false} />
          </div>
        </TimerButton> */}
      </div>

      <p>
        After you finish each step, you will hear a bell and move on to the next
        step, until you press the button again.
      </p>
      <p>
        After the second click, your session is over. The session time will be
        recorded in the statistics.
      </p>
    </div>
  )
}

const TutorialFifthStep: React.FC = () => {
  const todayTimestamp = Date.now()

  return (
    <div className={styles.styledSwipeableView}>
      <h2>Statistics</h2>
      <div className={styles.tutorialDemoWrapper}>
        {/* <TutorStatsNumbers
          statsData={{
            firstSessionDate: (todayTimestamp -
              MILLIS_IN_DAY * 30) as Millisecond,
            totalDuration: 1000 as Minute,
            count: 2000,
            userId: "abc",
            streak: 30,
            maxStreak: 100,
            averageDuration: 1000 as Minute,
            averageCount: 2000,
            updatedAt: todayTimestamp as Millisecond
          }}
        /> */}
      </div>

      <p>
        If you swipe to the right or press the screen switcher (••), you will be
        taken to your statistics screen.
      </p>
      <p>
        Here you will see the amount of practice in hours, the average session
        in minutes, and how many days until the next practice level.
      </p>
    </div>
  )
}

/* eslint-disable max-lines */
// const TutorialDemoWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 5rem;
//   border: 0.25rem solid var(--c-background);
//   border-radius: 2rem;
//   width: 100%;
//   flex-direction: column;
//   align-items: center;
// `
