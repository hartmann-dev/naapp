import { SET_MEMBER, SET_MEMBER_DETAILS, SET_GUESTS } from "../actions/artist";

const initialState = {
  availableMembers: [], //ggf cachen
  memberDetails: null,
  availableGuests: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER:
      return {
        ...state,
        availableMembers: action.member,
      };
    case SET_MEMBER_DETAILS:
      return {
        ...state,
        memberDetails: action.details,
      };
    case SET_GUESTS:
      return {
        ...state,
        availableGuests: action.guests,
      };
  }

  return state;
};
