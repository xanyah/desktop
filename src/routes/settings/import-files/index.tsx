import './styles.scss'

import {test} from '../../../utils/import-helper'
import { useCurrentStore } from '../../../hooks'

const ImportFiles = () => {
  const currentStore = useCurrentStore()
  const storeId = currentStore?.id

  return (
    <div className="import-files">
      <button
        className="btn-primary"
        onClick={() => test(storeId)}
      >
        Click Here to download your file
      </button>
    </div>
  )
}

export default ImportFiles
