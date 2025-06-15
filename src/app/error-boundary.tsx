import React, { ErrorInfo } from "react"
import styled from "styled-components"

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  padding: 1rem;

  & > h1,
  p {
    width: 100%;
    text-align: center;
  }

  & > p {
    font-size: 2rem;
  }
`

interface Props {
  children: React.ReactNode
}

export class ErrorBoundary extends React.Component<Props> {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorWrapper>
          <h1>Error</h1>
          <p>
            Something went wrong
            <br />
            and we don't know why yet 🤷‍♂️
            <br />
            <small>(sorry)</small>
          </p>
        </ErrorWrapper>
      )
    }

    return <>{this.props.children}</>
  }
}
