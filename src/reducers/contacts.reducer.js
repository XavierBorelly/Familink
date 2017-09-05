export const initialState = {
  contactsList: [],
};

export default function contactsReducer(state = initialState, action = null)
{
  if (action !== null)
  {
    if (action.type === 'ADD_CONTACT')
    {
      return {
        ...state,
        contactsList: [action.newContact, ...state.contactsList],
      };
    }
    return state;
  }
  return state;
}
