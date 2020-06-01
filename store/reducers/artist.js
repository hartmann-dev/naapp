import News from "../../models/artist";
import { SET_MEMBER, SET_MEMBER_DETAILS } from "../actions/artist";

const initialState = {
  availableMembers: [], //ggf cachen
  memberDetails: null,
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
  }

  return state;
};
