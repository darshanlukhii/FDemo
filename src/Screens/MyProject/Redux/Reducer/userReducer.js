const initialstate = {
  id: 1,
  user: [],
};

const userReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'ADD_ID':
      return {...state, id: state.id + 1};
    case 'ADD_USER':
      return {...state, user: [...state?.user, action?.payload]};
    case 'EDIT_USER_LIKE':
      const editLike = state.user.map(item => {
        // console.log('item', item);
        if (item.id == action.payload) {
          return {...item, like: item.like + 1};
        }
        return item;
      });
      return {...state, user: editLike};
    case 'DELETE_DATA':
      return {
        ...state,
        user: state.user.filter(item => item.id !== action.payload),
      };
    default:
      return initialstate;
  }
};

export default userReducer;
