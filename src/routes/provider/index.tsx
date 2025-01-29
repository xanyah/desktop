import { useState } from 'react'
import { providerFormat } from '../../types'


import { useProvider, useCurrentStore } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createProvider, updateProvider } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import DataDetails from "../../components/data-details";
import { useTranslation } from "react-i18next";

const Provider = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const store = useCurrentStore();
  const { id } = useParams();
  const { data: providerData } = useProvider(id);

  const { mutate: createApiProvider } = useMutation({
    mutationFn: (newData: any) =>
      createProvider({ ...newData, storeId: store?.id }),
    onSuccess: (data) => {
      navigate(`/providers/${data.data.id}`);
      setIsEditing(false);
      showSuccessToast(
        t("toast.created", { entity: t("models.providers.title") })
      );
    },
  });

  const { mutate: updateApiProvider } = useMutation({
    mutationFn: (newData) => updateProvider(id, newData),
    onSuccess: () => {
      setIsEditing(false);
      showSuccessToast(t("toast.updated"));
    },
  });

  return (
      <div className="provider-page">
        <h1 className="data-details-title">{providerData?.data.name}</h1>
        <DataDetails
          createEntity={createApiProvider}
          currentEntity={providerData?.data}
          editing={isEditing}
          formattedData={providerFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="providers"
          updateEntity={updateApiProvider}
        />
      </div>
  )
}

export default Provider;
