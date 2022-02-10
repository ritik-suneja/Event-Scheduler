import { fireDB } from "../../firebase"


export const handlegetusers = () =>{
    return (dispatch)=>{
        fireDB.child('users').on("value",(snapshot)=>{
            try{
            if(snapshot.val() !== null){
                dispatch(
                    {
                        type: 'getusers',
                        payload: snapshot.val()
                    })
                }
                else {
                    dispatch(
                        {
                            type: 'getusers',
                            payload: {}
                        })
            }
            } catch (err){
                dispatch(
                    {
                        type: 'geterror',
                        payload: err
                    }
                )
            }
        })
    }
        
}

export const handlegetEvent = (id) =>{
    return (dispatch)=>{
        dispatch(
            {
                type: 'startEvents',
            }
        )
        fireDB.child(id.toString()).on("value",(snapshot)=>{
            try{
            if(snapshot.val() !== null){
                dispatch(
                    {
                        type: 'getEvents',
                        payload: snapshot.val()
                    })
                }
                else {
                    dispatch(
                        {
                            type: 'getEvents',
                            payload: {}
                        })
            }
            } catch (err){
                dispatch(
                    {
                        type: 'geterror',
                        payload: err
                    }
                )
            }
        })
        
        
    }
}



export const handleAddEvent = (id,addEvent) =>{
    return (dispatch)=>{
        dispatch(
        {
            type: 'startaddevent',
        })
        fireDB.child(id).push(addEvent, (err)=>{
            dispatch(
                {
                    type: 'addevent',
                })
           if(err) {
              
                   dispatch(
                       {
                           type:'adderror',
                           payload:err,
                       }
                   )
           }
       })
        
    }
}

export const handledeleteEvent = (id,obj) =>{
    
    return (dispatch)=>{
        dispatch(
            {
                type: 'startdeleteEvents',
            }
        )
        fireDB.child(`${id}/${obj}`).remove((err)=>{
             dispatch(
                 {
                    type: 'deleteEvents',
                 }
             )
            if(err) {
               
                    dispatch(
                        {
                            type:'deleteerror',
                            payload:err,
                        }
                    )
            }
        })

        
        
}
}
