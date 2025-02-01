import { Euro, Percent } from "lucide-react"
import { find,  } from "lodash"
import Select from 'react-select'
import { CheckoutSchemaType } from "./schema"
import {  Button, InputText } from "@/components"
import { Controller,  useFormContext } from "react-hook-form"
import { useCallback, useMemo } from "react"

const Promotion = () => {
  const { watch, control, setValue } = useFormContext<CheckoutSchemaType>()

  const options = useMemo(() => ([
    { label: 'Montant', value: 'flat_discount' },
    { label: 'Pourcentage', value: 'percent_discount' },
  ]), [])
  const promotionType = watch('salePromotionAttributes.type')

  const renderSpecificPromotionFields = useCallback(() => {
    switch (promotionType) {
    case 'flat_discount':
      return <>
        <Controller
          control={control}
          name="salePromotionAttributes.amountCents"
          render={({ field: { value, onChange } }) => (
            <InputText
              type="number"
              value={value}
              onChange={onChange}
              placeholder="Montant de la promotion"
            />)}
        />
        <div className="text-right"><Euro /></div>
      </>
    case 'percent_discount':
      return <>
        <Controller
          control={control}
          name="salePromotionAttributes.amountCents"
          render={({ field: { value, onChange } }) => (
            <InputText
              type="number"
              value={value}
              onChange={onChange}
              placeholder="Montant de la promotion"
            />)}
        />
        <div className="text-right">
          <Percent />
        </div>
      </>
    }
  }, [promotionType, control])


  if (!promotionType) {
    return <div className="col-start-4">
      <Button
        onClick={() => setValue(
          'salePromotionAttributes', {
            amountCents: 0,
            amountCurrency: 'EUR',
            type: 'flat_discount'
          })}>
      Ajouter une remise
      </Button>
    </div>
  }

  return <>
    <div className="col-span-2">
      <Controller
        control={control}
        name="salePromotionAttributes.type"
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={(item) => onChange(item?.value)}
            value={find(options, { value })}
            options={options}
          />)}
      />
    </div>
    {renderSpecificPromotionFields()}
  </>
}

export default Promotion
