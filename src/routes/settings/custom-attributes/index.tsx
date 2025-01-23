import { useState } from "react";

import FormAttribute from "../../../containers/form-attribute";

import "./styles.scss";
import { useMutation } from "@tanstack/react-query";
import { createCustomAttribute } from "../../../api";
import { useCurrentStore, useCustomAttributes } from "../../../hooks";
import { Trans } from "react-i18next";

const CustomAttributes = () => {
  const currentStore = useCurrentStore();
  const [newCustomAttribute, setNewCustomAttribute] = useState({});
  const { data: customAttributesData } = useCustomAttributes({
    storeId: currentStore.id,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      createCustomAttribute({
        ...newCustomAttribute,
        storeId: currentStore.id,
      }),
  });

  const handleUpdate = (attribute, value) => {
    setNewCustomAttribute((oldValue) => ({
      ...oldValue,
      [attribute]: value,
    }));
  };

  const renderCustomAttributesForm = () => {
    return (
      <form
        className="custom-attribute-form"
        key="form"
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <FormAttribute
          attribute="name"
          inline
          key="name"
          value={newCustomAttribute["name"]}
          model="custom_attributes"
          type="string"
          onUpdate={(attribute, value) => handleUpdate(attribute, value)}
        />

        <FormAttribute
          attribute="type"
          inline
          key="type"
          value={newCustomAttribute["type"]}
          model="custom_attributes"
          type="type"
          onUpdate={(attribute, value) => handleUpdate(attribute, value)}
        />

        <button className="btn-solid" type="submit">
          <Trans i18nKey="global.validate" />
        </button>
      </form>
    );
  };

  const renderCustomAttributesList = () => {
    return (
      <div className="custom_attributes" key="table">
        <h1>
          <Trans i18nKey="models.customAttributes.title" />
        </h1>

        <div className="custom-attribute-header">
          <div className="name">
            <Trans i18nKey="models.customAttributes.name" />
          </div>
          <div className="type">
            <Trans i18nKey="models.customAttributes.type" />
          </div>
        </div>
        {customAttributesData?.data.map((customAttribute) => (
          <div className="custom-attribute" key={customAttribute.name}>
            <div className="name">{customAttribute.name}</div>
            <div className="type">{customAttribute.type}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="custom-attributes">
      {renderCustomAttributesForm()}
      {renderCustomAttributesList()}
    </div>
  );
};

export default CustomAttributes;
