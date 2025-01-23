import { useEffect, useState } from "react";
import Select from "react-select";

import FormAttribute from "../../../containers/form-attribute";
import { countryList } from "../../../utils/country-helper";

import "./styles.scss";
import { useCurrentStore, useVatRates } from "../../../hooks";
import { useMutation } from "@tanstack/react-query";
import { updateStore } from "../../../api";
import { Trans } from "react-i18next";

const StoreSettings = () => {
  const currentStore = useCurrentStore();
  const [updatedStore, setUpdatedStore] = useState({
    address: "",
    country: "",
    name: "",
  });

  const { data: vatRatesData } = useVatRates(updatedStore?.country);

  const { mutate } = useMutation({
    mutationFn: () => updateStore(currentStore?.id, updatedStore),
  });

  useEffect(() => {
    setUpdatedStore(currentStore);
  }, [setUpdatedStore, currentStore]);

  const handleUpdateStore = (attribute, value) => {
    setUpdatedStore((oldValue) => ({
      ...oldValue,
      [attribute]: value,
    }));
  };

  const renderVatRatesCountry = () => {
    if (!vatRatesData?.data) return null;

    const {
      standardRate,
      reducedRate,
      reducedRateAlt,
      superReducedRate,
      parkingRate,
    } = vatRatesData?.data || {};

    return (
      <div className="vat-rates">
        <span className="label">
          <Trans i18nKey="models.stores.vat" />:{" "}
        </span>
        <Trans i18nKey="vat-rates.standard" />
        :&nbsp;
        <b>{standardRate} %</b> -&nbsp;
        <Trans i18nKey="vat-rates.reduced_rate" />
        :&nbsp;
        <b>{reducedRate} %</b> -&nbsp;
        <Trans i18nKey="vat-rates.reduced_rate_alt" />
        :&nbsp;
        <b>{reducedRateAlt} %</b> -&nbsp;
        <Trans i18nKey="vat-rates.super_reduced_rate" />
        :&nbsp;
        <b>{superReducedRate} %</b> -&nbsp;
        <Trans i18nKey="vat-rates.parking_rate" />
        :&nbsp;
        <b>{parkingRate} %</b>
      </div>
    );
  };

  return (
    <form
      className="store-settings-form"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <div>
        <div className="row">
          <FormAttribute
            attribute="name"
            key="store"
            value={updatedStore?.name}
            model="stores"
            type="string"
            onUpdate={(attribute, value) => handleUpdateStore(attribute, value)}
          />
        </div>
        <div className="row">
          <FormAttribute
            attribute="address"
            key="store"
            value={updatedStore?.address}
            model="stores"
            type="string"
            onUpdate={(attribute, value) => handleUpdateStore(attribute, value)}
          />
        </div>
        <div className="row">
          <Select
            name="form-field-name"
            value={countryList?.find(
              (country) => country.value === updatedStore?.country
            )}
            onChange={(e) => handleUpdateStore("country", e)}
            options={countryList as any}
          />
          {renderVatRatesCountry()}
        </div>
      </div>
      <button className="btn-solid" type="submit">
        <Trans i18nKey="global.validate" />
      </button>
    </form>
  );
};

export default StoreSettings;
