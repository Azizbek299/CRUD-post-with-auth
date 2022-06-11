import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoalForm } from "../components/GoalForm";
import { GoalItem } from "../components/GoalItem";
import { Spinner } from "../components/Spinner";
import { getGoals, reset, updateGoal } from "../store/reducers/goalSlice";
import { GoalUpdateForm } from "../components/GoalUpdateform";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [updateText, setUpdateText] = useState('')
  const [textId, setTextId] = useState()


  useEffect(() => {

    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
  
    if(user) {
      dispatch(getGoals());
    }
    
    return () => {
      dispatch(reset()); //  ComponentUnmount  булганда ишга тушади  яни биз ушбу сахифадан чикиб кетсак дегани
    };

  }, [user, navigate, isError, message, dispatch]);


  if (isLoading) {
    return <Spinner />;
  }



  function updateHandle(e) {
    setUpdateText(e.text)
    setTextId(e._id)
    setUpdate(true);
  }

  function submitUpdate(e) {
    e.preventDefault()
    dispatch(updateGoal({id:textId, data:updateText}))

    setUpdate(false)
  }


 

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      {update ? <GoalUpdateForm updateText={updateText} setUpdateText={setUpdateText} submitUpdate={submitUpdate}/> : <GoalForm />}

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => {
              return (
                <GoalItem
                  key={goal._id}
                  goal={goal}
                  updateHandle={updateHandle}
                />
              );
            })}
          </div>
        ) : (
          <h1> You have not set any goals </h1>
        )}
      </section>
    </>
  );
};
