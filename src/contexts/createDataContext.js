import React, { useReducer } from 'react';

const createDataContext = (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    /*
    actions = {
      actionOneFunction: (dispatch) => () => { dispatch actionOne },
      actionTwoFunction: (dispatch) => () => { dispatch actionTwo },
    }
    */
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
