export const initialState = {
  contactsList: [],
};

export default function contactsReducer(state = initialState, action)
{
  switch (action.type)
  {
    case 'ADD_CONTACT': {
      return {
        ...state,
        contactsList: [action.newContact, ...state.contactsList],
      };
    }

    default:
      return state;
  }
}
