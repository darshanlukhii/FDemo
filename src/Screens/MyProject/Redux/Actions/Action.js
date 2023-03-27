export const addDetail = request => async dispatch => {
  dispatch({type: 'ADD_DETAIL', payload: request}); // console.log('--------> addUser request...', request);
};
export const addId = () => async dispatch => {
  dispatch({type: 'ADD_ID'}); // console.log('--------> addID request...');
};
