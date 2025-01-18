import { every } from "lodash";

export const ObjectValidator = (obj) => every(obj, value => !!value)