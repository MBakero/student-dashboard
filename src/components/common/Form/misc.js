import { isEmpty, isNaN, isNil } from 'lodash-es'
import { DEFAULT_VALIDATION_MESSSAGES as DEFAULT_MSGS, REGEX_PHONE, REGEX_EMAIL } from './constants'

// eslint-disable-next-line import/prefer-default-export
export const parseErrorMessage = (validation, key) => {
    if (validation === true) return DEFAULT_MSGS[key]
    return validation
}

export const validate = (value, validation) => {
    if (validation) {
        if (validation.custom && !validation.custom(value)) return { valid: false, error: validation.message }
        if (validation.required && (isNil(value) || isEmpty(value)))
            return { valid: false, error: parseErrorMessage(validation.required, 'required') }
        if (validation.number && isNaN(parseInt(value, 10))) return { valid: false, error: parseErrorMessage(validation.number, 'number') }
        if (validation.phone && !REGEX_PHONE.test(value)) return { valid: false, error: parseErrorMessage(validation.phone, 'phone') }
        if (validation.email && !REGEX_EMAIL.test(value)) return { valid: false, error: parseErrorMessage(validation.email, 'email') }
    }
    return { valid: true, error: null }
}
