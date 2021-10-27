import { createUseStyles } from 'react-jss'

// TODO: replace react-jss with material ui makeStyles
const useStyles = createUseStyles({
    input: {
        border: '1px solid #F0F0F0 !important',
        height: 36
    },
    inputError: {
        border: '1px solid #FF5A5A !important',
        backgroundColor: '#FFF3F3'
    },
    label: {
        display: 'block',
        marginBottom: 10
    },
    error: {
        marginTop: 23,
        color: '#C62D00',
        fontFamily: 'DIN_Light',
        fontSize: 12,
        lineHeight: 1.6,
        position: 'absolute',
        top: 45,
        left: 0,
        '&::first-letter': {
            textTransform: 'capitalize'
        }
    },
    field: {
        position: 'relative'
    },
    radioLabel: {
        textTransform: 'capitalize'
    }
})

export default useStyles
