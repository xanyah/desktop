import { useMemo, useState } from 'react'

import CustomAttribute from './custom-attributes'
import Categories from './categories'
import StoreSettings from './store-settings'
import ImportFiles from './import-files'

import './styles.scss'
import { Trans } from 'react-i18next'

const Settings = () => {
  const renderStoreSettings = () => {
    return <StoreSettings />
  }

  const renderCategories = () => {
    return <Categories />
  }

  const renderCustomAttributes = () => {
    return <CustomAttribute />
  }

  const renderImportFiles = () => {
    return <ImportFiles />
  }

  const steps = useMemo(() => ([
    {
      key: 'store-settings',
      render: () => renderStoreSettings(),
    },
    {
      key: 'categories',
      render: () => renderCategories(),
    },
    {
      key: 'custom-attributes',
      render: () => renderCustomAttributes(),
    },
    {
      key: 'import-files',
      render: () => renderImportFiles(),
    },
  ]), [])
  const [currentStepKey, setCurrentStepKey] = useState(steps[0].key)

  const currentStep = useMemo(
    () => steps.find(s => s.key === currentStepKey),
    [steps, currentStepKey]
  )

  console.log(steps)

  return (
      <div className="settings-page">
        <div className="side-navigation">
          {steps.map(s => (
            <button
              className={currentStepKey === s.key ? 'active' : ''}
              key={s.key}
              onClick={() => setCurrentStepKey(s.key)}
            >
              <Trans i18nKey={`settings-page.side-navigation.${s.key}`} />
            </button>
          ))}
        </div>
        <div className="content">
          {currentStep ? currentStep.render() : null}
        </div>
      </div>
  )
}

export default Settings
