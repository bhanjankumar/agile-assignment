import React, { useState, useEffect } from "react";
import { trackList } from "../mock/TrackerList";
import Form from "./Form";
import AddForm from "./AddForm";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

export default function List() {
  const dataType = useSelector(state => state.reducer.timestamp);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [tracks, setTracks] = useState([]);
  function editData(id) {
    setEdit(true);
    setAdd(false);
    axios.get('http://localhost:5000/tracks/'+id)
          .then(response=>{
            dispatch({type:"EDIT_DATA",payload:response.data,timestamp:new Date().getTime()})
          })
          .catch(error=>{
            console.log(error);
        })
  }
  function addData() {
    setEdit(false);
    setAdd(true);
  }
  function fetchData(){
    axios.get("http://localhost:5000/tracks")
          .then(response=>{
            setTracks(response.data)
          })
          .catch(error=>{
            console.log(error);
          })
  }
  useEffect(()=>{
    fetchData();
  },[dataType])
 
  return (
    <div>
      <h2>List</h2>
      <table class="table table-bordered">
        <thead>
          <tr>
            <td colSpan="6" className="text-right">
              <span onClick={() => addData()}>+Add List</span>
            </td>
          </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Income/Expense</th>
            <th scope="col">Amount</th>
            <th scope="col">Summary</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((data, key) => (
            <tr>
              <th scope="row">{key+1}</th>
              <td>{data.date}</td>
              <td>{data.income}</td>
              <td>{data.amount}</td>
              <td>{data.summary}</td>
              <td onClick={() => editData(data._id)}>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
      {edit && <Form  />}
      {add && <AddForm />}
    </div>
  );
}
