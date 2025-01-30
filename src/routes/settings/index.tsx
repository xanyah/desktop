import { useMemo, useState } from 'react'

import CustomAttribute from './custom-attributes'
import Categories from './categories'
import StoreSettings from './store-settings'
import ImportFiles from './import-files'


import { Trans } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'

const Settings = () => {
  return (
      <div className="settings-page">
        <div className="flex flex-row gap-4">
        <Link to="/settings/store">Boutique</Link>
        <Link to="/settings/categories">Catégories</Link>
        <Link to="/settings/custom-attributes">Attributs de produits</Link>
        <Link to="/settings/import">Import</Link>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
  )
}

export default Settings
