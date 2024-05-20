import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import styles from "./Selected.module.css";

const SelectDropDown = () => {
  return (
    <div className={styles.dropdownMenu}>
    <Select
      placeholder="Select a Lane"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 240,
        marginTop:4,
        marginLeft:26,
        fontWeight:"bold",
        border:"2px solid black",
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
         <Option value="select a lane">select a lane</Option>
      <Option value="Lane1">Lane1</Option>
      <Option value="Lane2">Lane2</Option>
      <Option value="Lane3">Lane3</Option>
     
    </Select>
    </div>
  )
}

export default SelectDropDown