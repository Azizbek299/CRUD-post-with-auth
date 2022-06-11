import React from "react";




export const GoalUpdateForm = (props) => {


  return (
    <section className='form'>
        <form onSubmit={props.submitUpdate}>
            <div className="form-group">
                <label htmlFor="text">Goal update</label>
                <input type="text" name="text" id="text" value={props.updateText} onChange={(e) => props.setUpdateText(e.target.value)}/>
            </div>
             <div className="form-group">
                 <button className='btn btn-block' type="submit">Update Goal</button>
             </div>
        </form>

    </section>
  )
}
