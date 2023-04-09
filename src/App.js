import React,{useState,useReducer} from "react";
import "./style.css";
import Modal from './modal';
import {data} from './data';

export default function App() {

  const reducer =(state,action)=>{
    if(action.type === 'ADD_ITEM'){
      const newPeople = [...state.people,action.payload]
      return{
          ...state,
          people:newPeople,
          isModalopen: true,
          modalContent:"item added"
      }
    }
    if(action.type === 'NO_VALUE'){
      return{
        ...state,
        isModalopen:true,
        modalContent:"please enter value"
      }
    }
    if(action.type ==='CLOSE_MODAL'){
      return{
        ...state,
        isModalopen:false,
      }
    }
    if(action.type ==='REMOVE_ITEM'){
      const newPeople = state.people.filter((person)=>
      person.id !== action.payload
      )
      return{
        ...state,
        people:newPeople
      }
    }
  }
  const defaultState = {
     people:[],
    isModalopen:false,
    modalContent:"hello world",
  }
  
  const [name, setName] = useState("");
  const [state,dispatch] = useReducer(reducer,defaultState);
  console.log(state);


  const handleSubmit = (e) =>{
    e.preventDefault();
    if(name){
      const newItem ={id: new Date().getTime().toString(), name}
      dispatch({type:"ADD_ITEM",payload:newItem})
      setName('')
    }else{
      dispatch({type:"NO_VALUE"})
    }
  }

  const closeModal =()=>{
    dispatch({type:'CLOSE_MODAL'})
  }
  return (
    <>
   
    {state.isModalopen && 
    <Modal 
    modalContent={state.modalContent}
    closeModal = {closeModal}
    />}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div> 
      <div className ="form-group">
        <button className='btn'>Add Item</button>
      </div> 
    </form>
        <div>
          {state.people.map((item)=>{
            return(
              <div key={item.id}>
                <h2>{item.name}</h2>
                <button onClick={()=>dispatch({type:'REMOVE_ITEM',payload:item.id})}>remove</button>
              </div>
            )
          })}
        </div>
    </>
  );
}
