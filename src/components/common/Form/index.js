import { useCallback, useState, useEffect } from 'react'
import { map, forEach, isFunction, isEmpty, reduce } from 'lodash-es'

// TODO: replace antd with material ui or whetever it suit u
import { Row, Col } from 'antd'

import clsx from 'clsx'
import Field from './Field'
import { validate } from './misc'

const initialState = {
    errors: {},
    dirty: {},
    touched: {},
    valid: {}
}

const Form = ({ data, form, onChange, classes, styles }) => {
    const [{ errors, dirty, touched, valid }, setState] = useState(initialState)

    const flattenFields = useCallback((formDef) => {
        const fields = {}
        forEach(formDef, (row) =>
            forEach(row.fields, (field) => {
                fields[field.property] = field
            })
        )
        return fields
    }, [])

    const validateField = useCallback(
        ({ property, value }) => {
            const field = flattenFields(form)[property]
            const lData = value || data[property]
            return validate(lData, field.validation)
        },
        [flattenFields, form, data]
    )

    useEffect(() => {
        const lValid = {}
        forEach(flattenFields(form), (field) => {
            lValid[field.property] = validateField({ property: field.property }).valid
        })
        setState((prevState) => ({ ...prevState, valid: lValid }))
    }, [])

    const disabled = useCallback((lDisabled) => (isFunction(lDisabled) ? lDisabled(data) : lDisabled), [data])

    const isValidForm = useCallback(
        (newField) => {
            if (isEmpty(valid)) return false
            return reduce(
                valid,
                (acc, field, key) => {
                    if (!acc) return false
                    if (key === newField.property) return newField.valid
                    return field
                },
                true
            )
        },
        [valid]
    )

    const displayError = useCallback(
        (property) => {
            const field = flattenFields(form)[property]
            let validation = {}
            if (dirty[property]) {
                validation = validateField({ property })
            } else if (touched[property]) {
                if (field.dateTime) {
                    validation = validateField({ property })
                }
            }
            setState((prevState) => ({
                ...prevState,
                errors: { ...prevState.errors, [property]: validation.error }
            }))
        },
        [flattenFields, form, touched, errors, validateField]
    )

    const clearFieldError = useCallback(
        (property) => {
            if (errors[property]) {
                setState((prevState) => ({ ...prevState, errors: { ...prevState.errors, [property]: null } }))
            }
        },
        [errors]
    )

    const handleFocus = useCallback(
        (property) => () => {
            clearFieldError(property)
            setState((prevState) => ({
                ...prevState,
                touched: { ...prevState.touched, [property]: true }
            }))
        },
        [clearFieldError]
    )

    const handleBlur = useCallback(
        (property) => () => {
            displayError(property)
        },
        [displayError]
    )

    const handleFieldChange = useCallback(
        (field) => (value) => {
            clearFieldError(field.property)
            const validation = validateField({ property: field.property, value })
            setState((prevState) => ({
                ...prevState,
                dirty: { ...prevState.dirty, [field.property]: true },
                valid: { ...prevState.valid, [field.property]: validation.valid }
            }))
            const formValid = isValidForm({
                property: field.property,
                valid: validation.valid
            })
            onChange(field.property, value, formValid)
        },
        [clearFieldError, valid, onChange, validateField, isValidForm]
    )

    return (
        <div className={clsx(classes?.root)}>
            {map(form, (row) => (
                <Row
                    key={row.key}
                    gutter={row?.gutter}
                    justify={row?.justify}
                    align={row?.align}
                    wrap={row?.wrap}
                    style={{ ...styles.row, ...row?.style }}
                    className={clsx(classes?.row, row?.className)}
                >
                    {map(row.fields, (field) => (
                        <Col span={field.span} key={field.property}>
                            <Field
                                /* eslint-disable-next-line react/jsx-props-no-spreading */
                                {...field}
                                classes={classes}
                                disabled={disabled(field.disabled)}
                                value={data[field.property]}
                                error={errors[field.property]}
                                onFocus={handleFocus(field.property)}
                                onBlur={handleBlur(field.property)}
                                onChange={handleFieldChange(field)}
                            />
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    )
}

Form.defaultProps = {
    data: {},
    form: [],
    onChange: (x) => x,
    styles: {},
    classes: {}
}

export default Form
