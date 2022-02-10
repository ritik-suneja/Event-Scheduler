let initialstate={
    allEvent:{},
    userlist:{},
    error: null,
}
const reducer= (state=initialstate,action)=>{
     if(action.type === 'startEvents')
    {
        return{
            ...state
        };
    }
    else if(action.type === 'getusers')
    {
        return{
            ...state,
            userlist:action.payload
        };
    }
    else if(action.type === 'getEvents')
    {
        return{
            ...state,
            allEvent:action.payload
        };
    }
    else if(action.type === 'geterror')
    {
        return{
            ...state,
            error: action.payload
        };
    }
    else if(action.type === 'startdeleteEvents' || action.type === 'startaddEvents')
    {
        return{
            ...state
        };
    }
    else if(action.type === 'deleteEvents'|| action.type === 'addEvents')
    {
        return{
            ...state
        };
    }
    else if(action.type === 'deleteerror' || action.type === 'adderror')
    {
        return{
            ...state,
            error: action.payload
        };
    }
    else {
        return state;
      }
}

export default reducer;