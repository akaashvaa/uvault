import { useUser } from '@clerk/clerk-react'
import { useStore } from '../store'
import TodoList from './TodoList'
import URLInput from './URLInput'
import { useEffect } from 'react'

export default function Main() {
  const { user } = useUser()
  const currentUser = user.externalAccounts[0]
  console.log(currentUser.id)
  const { createNewTaskFlag, updateTaskFlag } = useStore((state) => {
    return {
      createNewTaskFlag: state.createNewTaskFlag,
      updateTaskFlag: state.updateTaskFlag,
    }
  })

  const handleCreateNewNote = () => {
    console.log('Craete new note')
    updateTaskFlag(!createNewTaskFlag)
  }

  const sendUserIdToServer = async () => {
    try {
      const response = await fetch('http://localhost:3001/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser.id }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Failed to verify user:', error)
    }
  }
  // Call the function when the component mounts
  useEffect(() => {
    sendUserIdToServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-primary rounded-md">
      <div className="todo-list-item py-5 flex flex-col gap-5 bg-primary  pt-5 rounded-md justify-start items-center overflow-y-auto ">
        <button
          onClick={handleCreateNewNote}
          className=" border-[3px] rounded-md border-secondary flex px-3 justify-center items-center  "
        >
          Add New Article <span className=" text-3xl px-3 pb-1 "> &#43; </span>{' '}
        </button>

        {createNewTaskFlag && <URLInput />}

        <TodoList />
      </div>
    </div>
  )
}
