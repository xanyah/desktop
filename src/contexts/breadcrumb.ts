import { createContext, useContext, useEffect } from "react";

const BreadCrumbContext = createContext<React.Dispatch<React.SetStateAction<BreadCrumbElement[]>>>(() => {})

export const useBreadCrumbContext = (breadcrumb: BreadCrumbElement[]) => {
  const setBreadCrumb = useContext(BreadCrumbContext)

  useEffect(() => {
    setBreadCrumb(breadcrumb)

    return () => {
      setBreadCrumb([])
    }
  }, [setBreadCrumb, breadcrumb])
}

export default BreadCrumbContext
