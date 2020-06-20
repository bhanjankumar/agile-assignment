import React, { useState, useReducer, useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
export default function Form() {

  const listData = useSelector(state => state);
  
  const dispatch = useDispatch();
  const listEditData = listData.reducer.data && listData.reducer.data[0];
  const [id,setId] = useState("");
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

  function getData(id){
    axios.get('http://localhost:5000/tracks/'+id)
          .then(response=>{
            dispatch({type:"EDIT_DATA",payload:response.data,timestamp:new Date().getTime()})
          })
          .catch(error=>{
            console.log(error);
        })
  }
  function editSave(id) {
      setDateErr("");
      setIncomeErr("");
      setAmountErr("");
      setSummErr("");
      setSaveData("");
      let dateformat = /^\d{4}-\d{2}-\d{2}$/;
        if(date=="")
        { 
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

      axios.patch('http://localhost:5000/tracks/'+id,addArrayData)
          .then(response=>{
            dispatch({type:"SAVE_DATA",payload:response.data,timestamp:new Date().getTime()});
            getData(id);
            setSaveData("Data Updated Successfully");
          })
          .catch(error=>{
            console.log(error);
        })
  }
  useEffect(() => {
    setId(listEditData && listEditData._id)
    setdate(listEditData && listEditData.date);
    setincome(listEditData && listEditData.income);
    setamount(listEditData && listEditData.amount);
    setsummary(listEditData && listEditData.summary);
  }, [listEditData]);
  return (
    <div className="container">
      <h3>Edit</h3>
      <div className="row">
        <div className="col-12">
          <h4>{saveData}</h4>
          <div class="form-group text-left">
            <label for="date">Date</label>
            <input
              type="text"
              class="form-control"
              placeholder="YYYY-MM-DD"
              ref={dateref}
              value={date}
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
              value={income}
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
              value={amount}
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
              value={summary}
              onChange={e => setsummary(e.target.value)}
            />
             <span className="erorrMsg">{summErr}</span>
          </div>
          <button class="btn btn-primary" onClick={() => editSave(id)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
