import { useState, useEffect, useContext } from 'react'
import { data } from '../data'
import { ContactsContext } from '../providers/Provider'
import toast from 'react-hot-toast'

// Constructs a ContactsContext based on the context.
const useContacts = () => {
  return useContext(ContactsContext)
}

// Returns a new const with users users loading and loading.
const useContactsProvider = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // Use effect to get the users.
  useEffect(() => {
    getUsers()
  }, [])

  // Loads users from local storage.
  const getUsers = () => {
    // if local storage is not empty then retrieve the user
    if (localStorage.getItem('userIds')) {
      let ids = JSON.parse(localStorage.getItem('userIds'))
      let localStorageUsers = []
      ids.forEach((id) => {
        data.users.forEach((user) => {
          if (user.id === id) {
            localStorageUsers.push(user)
          }
        })
      })
      setUsers(localStorageUsers)
      setTimeout(() => {
        setLoading(false) // inorder to show spinner
      }, 500)
    } else {
      setLoading(false)
    }
  }

  //  this function add user for starting conversation
  // Adds a new conversation.
  const addUser = (userId) => {
    if (localStorage.getItem('userIds')) {
      let ids = JSON.parse(localStorage.getItem('userIds'))
      let isIdAlreadyPresent = ids.indexOf(userId)
      if (isIdAlreadyPresent === -1) {
        // add id to localStorage
        localStorage.setItem('userIds', JSON.stringify([...ids, userId]))
      }
    } else {
      // add the userId into local storage to make data persistent
      localStorage.setItem('userIds', JSON.stringify([userId]))
    }

    let toUser = data.users.filter((user) => user.id === userId)

    let index = users.indexOf(toUser[0])

    if (index !== -1) {
      // conversation of user has been already started
      toast.error('User already added')
      return
    }
    toast.success('Added New Conversation')
    setUsers([...users, toUser[0]])
  }

  // this function will search for conversation
  // Searches for a user.
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value) {
        toast.error('enter valid user')
        return
      }
    }
    // every time the input field is empty then grab the user from local storage to make search convenient
    // Returns a list of users if target value is not set.
    if (!e.target.value) {
      getUsers()
      return
    }

    // Returns true if the target value is included in the name.
    let newUser = users.filter((user) => {
      let name = user.name.toLowerCase()
      return name.includes(e.target.value)
    })

    setUsers(newUser)
  }

  // Returns a collection of users loaded from the database.
  return {
    users,
    loading,
    handleSearch,
    addUser,
    getUsers,
  }
}

export { useContactsProvider, useContacts }
