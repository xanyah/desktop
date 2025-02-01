import { last } from "lodash";
import { createContext, useContext, useEffect } from "react";

const BreadCrumbContext = createContext<React.Dispatch<React.SetStateAction<BreadCrumbElement[]>>>(() => {})

export const useBreadCrumbContext = (breadcrumb: BreadCrumbElement[]) => {
  const setBreadCrumb = useContext(BreadCrumbContext)

  useEffect(() => {
    setBreadCrumb(breadcrumb)
    window.document.title = last(breadcrumb)?.label || 'Xanyah'

    return () => {
      setBreadCrumb([])
    }
  }, [setBreadCrumb, breadcrumb])
}

export default BreadCrumbContext
