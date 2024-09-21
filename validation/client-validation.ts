// Validation function for client side validation

import { InputValidation } from '@/types/validationTypes';

export default function validate(validationSchema: any, value: any): InputValidation {
    const { error } = validationSchema.validate(value);
    return {valid: !error, errorMsg: error ? error.message || error.message : "", value: value};
}