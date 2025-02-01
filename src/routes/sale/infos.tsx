import { ShowAttribute } from "@/components";
import { customerFullname } from "@/helpers/customer";
import { formatPrice } from "@/helpers/price";
import { useTranslation } from "react-i18next";

type SaleInfosProps = {
  sale: Sale
}

const SaleInfos = ({sale}: SaleInfosProps) => {
  const {t} = useTranslation()
  return <div className="flex flex-row justify-between">
    <ShowAttribute label={t('sale.user')}>
      {customerFullname(sale.user)}
    </ShowAttribute>
    <ShowAttribute label={t('sale.amount')}>
      {formatPrice(sale.totalAmountCents, sale.totalAmountCurrency)}
    </ShowAttribute>
  </div>
}

export default SaleInfos;
