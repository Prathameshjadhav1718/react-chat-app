import { createContext } from 'react'
import { useContactsProvider } from '../hooks/useContacts'

// global state
// Loads a list of users.
let initialState = {
  users: [],
  loading: true,
  addUser: () => {},
  handleSearch: () => {},
  getUsers: () => {},
}

// Constructs a Const ContactsContext.
const ContactsContext = createContext(initialState)

// Constructs a ContactsContext. Provider.
const ContactsProvider = ({ children }) => {
  const contacts = useContactsProvider()
  return (
    <ContactsContext.Provider value={contacts}>
      {children}
    </ContactsContext.Provider>
  )
}

export { ContactsContext, ContactsProvider }
