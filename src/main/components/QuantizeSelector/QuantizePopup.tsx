import React, { SFC } from "react"
import Icon from "components/outputs/Icon"

import "./QuantizePopup.css"
import { Popover, makeStyles } from "@material-ui/core"

interface NumberPickerProps {
  value: number
  prevValue: () => number
  nextValue: () => number
  className: string
  onChange: (v: number) => void
}

const NumberPicker: SFC<NumberPickerProps> = ({
  value,
  prevValue,
  nextValue,
  className,
  onChange,
}) => {
  function handleWheel(e: React.WheelEvent) {
    e.preventDefault()
    onChange(e.deltaY < 0 ? prevValue() : nextValue())
  }

  return (
    <div className={`NumberPicker ${className}`}>
      <div className="button-up" onClick={() => onChange(nextValue())}>
        <Icon>chevron-up</Icon>
      </div>
      <div className="value" onWheel={handleWheel}>
        {value}
      </div>
      <div className="button-down" onClick={() => onChange(prevValue())}>
        <Icon>chevron-down</Icon>
      </div>
    </div>
  )
}

export interface QuantizePopupProps {
  value: number
  values: number[]
  triplet: boolean
  dotted: boolean
  isOpen: boolean
  onClose: () => void
  anchorEl: Element | null
  onChangeValue: (value: number) => void
  onChangeTriplet: (value: boolean) => void
  onChangeDotted: (value: boolean) => void
}

const useStyles = makeStyles((theme) => ({
  popover: {
    "& .MuiPopover-paper": {
      overflow: "visible",
      marginTop: "1em",
    },
  },
}))

export default function QuantizePopup({
  value = 8,
  values,
  triplet,
  dotted,
  isOpen,
  onClose,
  onChangeValue,
  onChangeTriplet,
  onChangeDotted,
  anchorEl,
}: QuantizePopupProps) {
  const prevValue = () => {
    const index = Math.max(values.indexOf(value) - 1, 0)
    return values[index]
  }
  const nextValue = () => {
    const index = Math.min(values.indexOf(value) + 1, values.length - 1)
    return values[index]
  }
  const classes = useStyles({})
  return (
    <Popover
      className={classes.popover}
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div className="QuantizePopup">
        <NumberPicker
          className="left"
          value={value}
          prevValue={prevValue}
          nextValue={nextValue}
          onChange={onChangeValue}
        />
        <div className="right">
          <div className="field">
            <input
              type="checkbox"
              onChange={(e) => onChangeTriplet(e.target.checked)}
              checked={triplet}
              id="QuantizePopupInputTriplet"
            />
            <label htmlFor="QuantizePopupInputTriplet">Triplet</label>
          </div>
          <div className="field">
            <input
              type="checkbox"
              onChange={(e) => onChangeDotted(e.target.checked)}
              checked={dotted}
              id="QuantizePopupInputDotted"
            />
            <label htmlFor="QuantizePopupInputDotted">Dotted</label>
          </div>
        </div>
      </div>
    </Popover>
  )
}
