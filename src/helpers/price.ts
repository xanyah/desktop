import {dinero, toDecimal} from 'dinero.js'
import * as currencies from '@dinero.js/currencies'
import { upperCase } from 'lodash';

export const formatPrice = (amount, currency) =>
toDecimal(dinero({ amount, currency: currencies[upperCase(currency)] }), ({ value, currency }) => `${value} ${currency.code}`);
