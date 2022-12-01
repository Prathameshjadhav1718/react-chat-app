import Sidebar from './Sidebar'
import Modal from './Modal'
import styles from '../styles/app.module.css'
import { useState } from 'react'
import Chat from './Chat'
import { Route, Routes } from 'react-router-dom'

// Creates a new app.
function App() {
  const [showModal, setShowModal] = useState(false)

  // Open a conversation.
  const handleOpenConversation = () => {
    setShowModal(true)
  }

  // Handle close modal.
  const handleCloseModal = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  // Returns a boolean indicating whether a chat should be shown or not.
  return (
    <div className={styles.app}>
      <div className={styles.chatBody}>
        {showModal && <Modal onClick={handleCloseModal} />}
        <Sidebar handleOpenConversation={handleOpenConversation} />
        <Routes>
          <Route
            path='chat/:chatId'
            element={
              <Chat
                handleCloseModal={handleCloseModal}
                handleOpenConversation={handleOpenConversation}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
