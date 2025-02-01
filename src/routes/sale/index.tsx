import { useCurrentStore, useSale } from "../../hooks";
import { useParams } from "react-router-dom";
import { uuidNumber } from "@/helpers/uuid";
import { ShowContainer, ShowSection } from "@/components";
import SaleProducts from "./products";
import SaleInfos from "./infos";
import { formatLongDatetime } from "@/helpers/dates";
import { useBreadCrumbContext } from "@/contexts/breadcrumb";

const Sale = () => {
  const store = useCurrentStore()
  const { id } = useParams();
  const { data: saleData } = useSale(id);
  useBreadCrumbContext([
    {label: 'Ventes', url: '/sales'},
    {label: `Vente ${uuidNumber(saleData?.data.id)}`}
  ])
  if (!saleData) {
    return null
  }
  return (
    <ShowContainer
    title={`Vente ${uuidNumber(saleData?.data.id)}`}
    subtitle={`Vente effectuée le ${formatLongDatetime(saleData?.data.createdAt)}`}
    >
        <ShowSection title="Informations générales">
        <SaleInfos sale={saleData?.data} />
        </ShowSection>

        <ShowSection title="Produits">
        <SaleProducts sale={saleData?.data} />
        </ShowSection>
    </ShowContainer>
  )
}

export default Sale;
