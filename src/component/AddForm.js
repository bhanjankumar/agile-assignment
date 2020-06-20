import React, { useState,useEffect,useRef } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

export default function AddForm() {
  const dispatch = useDispatch();
  const [date, setdate] = useState("");
  const [income, setincome] = useState("");
  const [amount, setamount] = useState("");
  const [summary, setsummary] = useState("");
  const [dateErr,setDateErr] = useState("");
  const [incomeErr,setIncomeErr] = useState("");
  const [amountErr,setAmountErr] = useState("");
  const [summErr,setSummErr] = useState("");
  const [saveData,setSaveData] = useState("");
  const dateref = useRef(null);
  const incomeref= useRef(null);
  const amountref = useRef(null);
  const summaryref = useRef(null);

  function addData() {
          setDateErr("");
          setIncomeErr("");
          setAmountErr("");
          setSummErr("");
          setSaveData("");
    let dateformat = /^\d{4}-\d{2}-\d{2}$/;
        if(date=="")
        { 
          //alert('Please enter date');
          setDateErr('Please enter date');
          dateref.current.focus();
          return false;
        }else if(!date.match(dateformat))
        { 
          setDateErr('wrong date format');
          dateref.current.focus();
          return false;
        }else if(income==""){
          setIncomeErr('Please enter income/expense');
          incomeref.current.focus();
          return false;
        }else if(amount==""){
          setAmountErr('Please enter amount');
          amountref.current.focus();
          return false;
        }else if(summary==""){
          setSummErr('Please enter summary');
          summaryref.current.focus();
          return false;
        }
    let addArrayData = {
      date: date,
      income: income,
      amount: amount,
      summary: summary
    };
    axios.post("http://localhost:5000/tracks",addArrayData)
    .then(response=>{
      dispatch({type:"ADD_DATA",payload:response.data,timestamp:new Date().getTime()})
      setSaveData("Data saved Successfully")
    })
    .catch(error=>{
      console.log(error)
    })
  }


  return (
    <div className="container">
      <h3>Add</h3>
      <div className="row">
        <div className="col-12">
          <h4>{saveData}</h4>
          <div class="form-group text-left">
            <label for="date">Date</label>
            <input
              type="text"
              class="form-control"
              placeholder="Date"
              ref={dateref}
              onChange={e => setdate(e.target.value)}
            />
            <span className="erorrMsg">{dateErr}</span>
          </div>
          <div class="form-group text-left">
            <label for="income">Income/Expense</label>
            <input
              type="text"
              class="form-control"
              placeholder="Income/Expence"
              ref={incomeref}
              onChange={e => setincome(e.target.value)}
            />
            <span className="erorrMsg">{incomeErr}</span>
          </div>
          <div class="form-group text-left">
            <label for="amount">Amount</label>
            <input
              type="text"
              class="form-control"
              placeholder="Amount"
              ref={amountref}
              onChange={e => setamount(e.target.value)}
            />
            <span className="erorrMsg">{amountErr}</span>
          </div>
          <div class="form-group text-left">
            <label for="summary">Summary</label>
            <input
              type="text"
              class="form-control"
              placeholder="Summary"
              ref={summaryref}
              onChange={e => setsummary(e.target.value)}
            />
            <span className="erorrMsg">{summErr}</span>
          </div>
          <button class="btn btn-primary" onClick={()=>addData()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
