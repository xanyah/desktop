import { useState } from "react";
import PageContainer from "../../containers/page-container";

import "./styles.scss";
import { useClient } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentStore } from "../../hooks/stores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, updateClient } from "../../api";
import { showSuccessToast } from "../../utils/notification-helper";
import { clientFormat } from "./config";
import { DataDetails } from "../../components";
import { convertUndefinedString } from "../../utils";
import { useTranslation } from "react-i18next";

const Client = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { data: store } = useCurrentStore();
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: clientData } = useClient(convertUndefinedString(id));

  const { mutate: createApiClient } = useMutation({
    mutationFn: (newData: ClientPayloadCreate) => {
      if (!store?.id) {
        throw new Error("Store ID is missing");
      }
      return createClient({ ...newData, storeId: store.id });
    },
    onSuccess: (data) => {
      navigate(`/clients/${data.data.id}`);
      setIsEditing(false);
      showSuccessToast(
        t("toast.created", {
          entity: t("models.manufacturers.title"),
        })
      );
    },
  });

  const { mutate: updateApiClient } = useMutation({
    mutationFn: (newData: ClientPayloadUpdate) => {
      if (!id) {
        throw new Error("Client ID is missing");
      }
      return updateClient(id, newData);
    },
    onSuccess: (updatedClient) => {
      queryClient.setQueryData(["clients", { id }], updatedClient);
      showSuccessToast(t("toast.updated"));
      setIsEditing(false);
    },
  });

  return (
    <PageContainer>
      <div className="client-page">
        {clientData && (
          <h1 className="data-details-title">{`${clientData?.data.firstname} ${clientData?.data.lastname}`}</h1>
        )}
        <DataDetails
          createEntity={createApiClient}
          currentEntity={clientData?.data}
          editing={isEditing}
          formattedData={clientFormat}
          toggleEdit={() => setIsEditing(!isEditing)}
          type="clients"
          updateEntity={updateApiClient}
        />
      </div>
    </PageContainer>
  );
};

export default Client;
