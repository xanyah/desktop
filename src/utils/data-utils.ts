import { every } from 'lodash';

export const ObjectValidator = (obj) => every(obj, value => !!value)

export const convertUndefinedString = (value: string | undefined): string | undefined => {
    return value === "undefined" ? undefined : value;
};
