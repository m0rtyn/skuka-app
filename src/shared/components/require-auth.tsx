import { auth } from "app/firebase-init"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation, Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  let location = useLocation()
  const [user, loading] = useAuthState(auth)

  if (!user && !loading) {
    // Redirect users to the /login page,
    // but save the current location they were trying to go to when they were redirected.
    // This allows us to send them along to that page after they login,
    // which is a nicer user experience than dropping them off on the home page.
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
      />
    )
  }

  return children
}
