/** @format */

import React, { useState } from "react"
import { Stack, Autocomplete, TextField } from "@mui/material"
import Airport from "../data/Airport.json"
import { useEffect } from "react"

//console.log(Airport.map((x) => x.city === "London"))

const InputAutoComplete = ({ getInput, label }) => {
  const airportOptions = Airport.map((item, index) => ({
    option: item,
  }))
  const [value, setValue] = useState(null)
  useEffect(() => {
    getInput(value)
    //console.log(value)
  }, [value])

  return (
    <Stack spacing={1} className='border-0'>
      <Autocomplete
        options={airportOptions
          .slice(0, 100)
          .map((item) => `${item.option.city} ${item.option.IATA}`)}
        renderInput={(params) => (
          <TextField {...params} label={label} className='pb-n1' />
        )}
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue.split(" ").pop())
        }}
      />
    </Stack>
  )
}

export default InputAutoComplete
