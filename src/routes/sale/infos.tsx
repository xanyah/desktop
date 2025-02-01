import { ShowAttribute } from "@/components";
import { customerFullname } from "@/helpers/customer";
import { formatPrice } from "@/helpers/price";

type SaleInfosProps = {
  sale: Sale
}

const SaleInfos = ({sale}: SaleInfosProps) => {
  return <div className="flex flex-row justify-between">
    <ShowAttribute label="Vendeur">
      {customerFullname(sale.user)}
    </ShowAttribute>
    <ShowAttribute label="Montant de la vente">
      {formatPrice(sale.totalAmountCents, sale.totalAmountCurrency)}
    </ShowAttribute>
  </div>
}

export default SaleInfos;
