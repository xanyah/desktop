import { useCurrentUser } from "@/hooks"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const Offline = () => {
  const {isLoading, isSuccess} = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate("/")
    }
  }, [isLoading, isSuccess, navigate])

  return <Outlet />
}

export default Offline
