import React from 'react'
import {useDispatch} from 'react-redux'
import {deleteGoal, updateGoal} from '../store/reducers/goalSlice'
import { HiOutlinePencilAlt } from "react-icons/hi";


export const GoalItem = (props) => {
    const dispatch = useDispatch()

   
  return (
    <div className='goal'>
        <div>{new Date(props.goal.createdAt).toLocaleString('en-US')}</div>
        <h2>{props.goal.text}</h2>
        <button className='close' onClick={() => dispatch(deleteGoal(props.goal._id))}>X</button>
        <button className='close1' onClick={() => props.updateHandle(props.goal)}><HiOutlinePencilAlt/></button>
    </div>
  )
}
