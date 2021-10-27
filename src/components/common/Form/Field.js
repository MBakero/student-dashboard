import clsx from 'clsx'

// TODO: replace antd with material ui or whetever it suit u
import { Radio, Input as AntdInput } from 'antd'
import { isEmpty } from 'lodash-es'
import useStyles from './styles'

const Field = ({
    name,
    type,
    multiple,
    options,
    value,
    onChange,
    label,
    validation,
    style,
    onFocus,
    onBlur,
    error,
    required,
    disabled,
    className,
    classes,
    compact,
    ...field
}) => {
    const lClasses = useStyles()
    const Label = () => (
        <label className={clsx(lClasses.label, classes?.label)} htmlFor={name}>
            {label}
        </label>
    )

    const Error = () => (error ? <span className={clsx(lClasses.error, classes?.error)}>{error}</span> : null)

    const handleChange = () => (evt) => {
        if (isEmpty(evt.target.value)) {
            return onChange(null)
        }
        return onChange(evt.target.value)
    }

    if (type === 'radio') {
        return [
            <Label key="label" />,
            <Radio.Group key="radio" id={name} value={value} onChange={handleChange()}>
                {options.map((elt) => (
                    <Radio className={lClasses.radioLabel} key={elt.value} value={elt.value}>
                        {elt.label}
                    </Radio>
                ))}
            </Radio.Group>
        ]
    }

    if (type === 'custom') {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <field.Component onChange={handleChange()} {...field} />
    }

    return (
        <div className={clsx(lClasses.field, classes?.field)}>
            <Label key="label" />
            <AntdInput
                key="input"
                value={value}
                name={name}
                label={label}
                style={style}
                className={clsx(lClasses.input, className, { [lClasses.inputError]: error })}
                onChange={handleChange()}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                required={required}
            />
            <Error key="error" />
        </div>
    )
}

Field.defaultProps = {
    type: 'text',
    variant: 'outlined',
    value: '',
    multiline: false,
    rows: 1,
    multiple: false,
    disabled: false,
    required: false,
    shrink: true,
    options: [],
    validation: {},
    style: {}
}

export default Field
