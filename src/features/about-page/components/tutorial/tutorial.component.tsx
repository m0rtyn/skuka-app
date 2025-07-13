// import { virtualize } from "react-swipeable-views-utils"
import { PageWrapper } from "../../about-page.styles"
// import SwipeableViews from "react-swipeable-views"
import { ViewsSwitcher } from "features/home/components/views-switcher/views-switcher.component"
// import { tutorialSlideRenderer } from "./tutorial-slide-renderer"
import { useAppDispatch, useAppSelector } from "app/store"
import { aboutPageActions, aboutPageSelectors } from "../../about-page.slice"
import { Footer } from "shared/components/footer/footer.component"

const SLIDES_COUNT = 5
// const VirtualizedSwipeableViews = virtualize(SwipeableViews)

export const Tutorial = () => {
  const dispatch = useAppDispatch()
  const slideIndex = useAppSelector(aboutPageSelectors.getTutorialSlideIndex)

  const setSlideIndex = () => {
    const newIndex = slideIndex < SLIDES_COUNT - 1 ? slideIndex + 1 : 0
    dispatch(aboutPageActions.setTutorialSlideIndex(newIndex))
  }

  return (
    <>
      <PageWrapper>
        {/* <VirtualizedSwipeableViews
          slideRenderer={tutorialSlideRenderer}
          style={{ height: "100%" }}
          onChangeIndex={setSlideIndex}
          index={slideIndex}
          slideCount={SLIDES_COUNT}
          enableMouseEvents
          resistance
        /> */}
      </PageWrapper>
    </>
  )
}
