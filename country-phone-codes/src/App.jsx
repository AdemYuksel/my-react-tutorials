import React, { useState, useEffect } from 'react'
import { IconContext } from "react-icons";
import { HiChevronUpDown } from 'react-icons/hi2'
import axios from './api/axios'
import './App.css'

function App() {
  const [select, setSelect] = useState(null);
  const [selectFlag, setSelectFlag] = useState(null);
  const [selectCode, setSelectCode] = useState();
  const COUNTRY_FLAG = '/countries/flag/images'
  const COUNTRY_CODE = '/countries/codes'

  useEffect(() => {
    axios.get(
      COUNTRY_FLAG,
      {
        headers: {}
      },
    ).then((response) => {
      localStorage.setItem('flag', JSON.stringify(response.data));
      const country = select;
      return getFlag().data.map((flag, key) => {
        country === flag.name && flag.flag != undefined ?
          setSelectFlag(flag.flag)
          : ""
      }
      )
    }).catch((error) => {
      console.log(error);
    });
  }, [{ selectFlag, select }]);

  useEffect(() => {
    axios.get(
      COUNTRY_CODE,
      {
        headers: {}
      },
    ).then((response) => {
      localStorage.setItem('code', JSON.stringify(response.data));
      const country = select;
      return getCode().data.map((code, key) => {
        country === code.name && code.dial_code != undefined ?
          setSelectCode(code.dial_code)
          : ""
      }
      )
    }).catch((error) => {
      console.log(error);
    });
  }, [{ selectCode }]);

  const getFlag = () => {
    return JSON.parse(localStorage.getItem("flag")) !== null ? JSON.parse(localStorage.getItem("flag")) : "";
  };

  const getCode = () => {
    return JSON.parse(localStorage.getItem("code")) !== null ? JSON.parse(localStorage.getItem("code")) : "";
  };

  return (
    <div>
      <form >
        <div id="select-box">
          <input type="checkbox" id="options-view-button" />
          <div id="select-button" className="brd">
            <div id="selected-value">
              <span>Select a country</span>
            </div>
            <IconContext.Provider value={{ color: "blue", style: { marginTop: "0px" } }}>
              <div id="chevrons">
                <HiChevronUpDown />
              </div>
            </IconContext.Provider>
          </div>
          <div id="options">
            {
              (localStorage.getItem("code") != null && localStorage.getItem("flag") != null) &&
              getFlag().data.map((flag, key, index, index2) =>
                <div className="option">
                  <input className="s-c top" type="radio" name="platform" value={flag.name} onChange={(e) => setSelect(e.target.value)} />
                  <input className="s-c bottom" type="radio" name="platform" value={flag.name} onChange={(e) => setSelect(e.target.value)} />
                  <img key={index} src={flag.flag}></img>
                  <span className="label" key={key}>{flag.name + " (" + flag.iso2 + ")"}</span>
                  <span className="opt-val" key={index2}>{flag.name}</span>
                </div>
              )}

            <div id="option-bg"></div>

          </div>
        </div>
      </form>
      {(select !== null && selectCode !== undefined && selectFlag !== undefined) &&
        <div style={{ background: "white", border: "1px solid lightgray", borderRadius: 10, marginTop: 10, padding: 25 }}>

          {
            select !== null ?
              <h1>Country: {select}</h1>
              :
              ""
          }
          {console.log({ selectCode })}
          {
            selectCode !== undefined ?
              <h1>Phone Code: {selectCode}</h1>
              :
              ""
          }
          {
            selectFlag !== undefined ?
              <img src={selectFlag} alt={select} style={{ maxHeight: '200px' }} />
              :
              ""
          }
        </div>}
    </div >
  )
}

export default App
