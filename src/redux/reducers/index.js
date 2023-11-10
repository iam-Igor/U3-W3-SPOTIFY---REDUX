const initialState = {
  favourites: {
    content: [],
    musicBar: [],
    search: "",
    searchData: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAV":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          content: [...state.favourites.content, action.payload],
        },
      };
    case "ADD_TO_BAR":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          musicBar: [action.payload],
        },
      };
    case "SEARCH":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          search: action.payload,
        },
      };
    case "SET_SEARCH":
      return {
        ...state,
        favourites: {
          ...state.favourites,
          searchData: [action.payload],
        },
      };

    default:
      return state;
  }
};

export default mainReducer;
