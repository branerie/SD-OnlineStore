import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const CustomizedSlider = withStyles({
    root: {
        color: '#F48379',
        height: 8,
    },
    thumb: {
        height: 18,
        width: 18,
        border: '2px solid #735C74',
        marginTop: -6,
        marginLeft: -9,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 6,
        borderRadius: 3,
    },
    rail: {
        height: 6,
        borderRadius: 3,
    },
})(Slider)

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 10px'
    }
}))

const RangeInput = (props) => {
    const {
        value,
        handleChange,
        rangeStart,
        rangeEnd,
        rangeStep = 1,
        units = ''
    } = props

    const classes = useStyles()

    function valuetext(value) {
        return `${value}${units}`;
    }

    return (
        <div className={classes.root}>
            <CustomizedSlider
                value={value}
                onChange={handleChange}
                min={rangeStart}
                max={rangeEnd}
                step={rangeStep}
                valueLabelDisplay='auto'
                getAriaValueText={valuetext}
            />
        </div>
    )
}

export default RangeInput