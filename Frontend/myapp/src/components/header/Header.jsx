import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {format} from "date-fns"
import "./Header.css";

const Header = ({type}) => {
    const[opendate,setOpendate]=useState(false);
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const[openOption,setOpenOption]=useState(false);
      const[options,setOptions]=useState({
        adult:1,
        children:0,
        room:1
      });
      const handleOption=(name,operation)=>{
      setOptions((prev)=>{
        return{...prev ,[name]:operation==="i" ? options[name]+1:options[name]-1,
      }})
      }
  return (
    <div className='header'>
    <div className={type ==="list" ? "headerContainer listMode":'headerContainer'}>
        <div className='headerList'>
        <div className='headerListItem active'>
        <FontAwesomeIcon icon={faBed} />
        <span>Stays</span>
        </div>
        <div className='headerListItem'>
        <FontAwesomeIcon icon={faPlane} />
        <span>Flights</span>
        </div>
        <div className='headerListItem'>
        <FontAwesomeIcon icon={faCar} />
        <span>car rentals</span>
        </div>
        <div className='headerListItem'>
        <FontAwesomeIcon icon={faBed} />
        <span>Attractions</span>
        </div>
        <div className='headerListItem'>
        <FontAwesomeIcon icon={faTaxi} />
        <span>Airport taxis</span>
        </div>
        </div>
      { type !=="list" &&
      <>
      <h1 className='headerTitle'>a lifetime discount</h1>
        <p className='headerDesc'>
            this product is very good
        </p>
       <button className='headerBtn'>Login/Register</button>
       <div className='headerSearch'>
        <div className='headerSearchItem'>
        <FontAwesomeIcon icon={faBed} className='headerIcon'/>
        <input
            type='text'
            placeholder='where are you going'
            className='headerSearchInput'

        />
        </div>
        <div className='headerSearchItem'>
        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
        <span onClick={()=>setOpendate(!opendate)} className='headerSearchText'>{`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
          
        {opendate && <DateRange
         editableDateInputs={true}
         onChange={item => setDate([item.selection])}
         moveRangeOnFirstSelection={false}
         ranges={date}
         className='date'
    />}

        </div>
        <div className='headerSearchItem'>
        <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
      <span onClick={()=>setOpenOption(!openOption)}className='headerSearchText'>{`${options.adult} adult . ${options.children} children .${options.room} room`}</span>
         {openOption && <div className='options'>
            <div className='optionItem'>
            <span className='optionText'>Adult</span>
            <div className='optionCounter'>

            <button disabled={options.adult <=1}
            className='optionCounterButton' onClick={()=>handleOption("adult","d")}>-</button>
               <span className='optionCounterNumber'>{options.adult}</span>
              <button className='optionCounterButton' onClick={()=>handleOption("adult","i")}>+</button>
            </div>
            </div>
            <div className='optionItem'>
            <span className='optionText'>Children</span>
            <div className='optionCounter'>
              <button disabled={options.children <=0} 
              className='optionCounterButton' onClick={()=>handleOption("children","d")}>-</button>
               <span className='optionCounterNumber'>{options.children}</span>
              <button className='optionCounterButton' onClick={()=>handleOption("children","i")}>+</button>
              </div>
            </div>
            <div className='optionItem'>
            <span className='optionText'>Room</span>
            <div className='optionCounter'>
              <button disabled={options.room <=1} 
              className='optionCounterButton' onClick={()=>handleOption("room","d")}>-</button>
               <span className='optionCounterNumber'>{options.room}</span>
              <button className='optionCounterButton' onClick={()=>handleOption("room","i")}>+</button>
              </div>
            </div>
         </div>
         }
        </div>
        <div className='headerSearchItem'>
        <button className='headerBtn'>Search</button>
        </div>
       </div></>}
    </div>
    </div>
  )
}

export default Header