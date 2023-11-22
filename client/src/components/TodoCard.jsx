import { useState } from 'react'
import deleteIcon from '../assests/delete.svg'
import copyIcon from '../assests/copy.svg'
import copiedIcon from '../assests/copied.svg'
import { useStore } from '../store'

const TodoCard = ({ note }) => {
  const deleteTask = useStore((state) => state.deleteTask)

  const [open, setOpen] = useState(false)
  const [copy, setCopy] = useState(false)

  const handleNoteClick = (note) => {
    console.log('Note clicked')
  }
  const handleDeleteTask = (note) => {
    console.log('Task Deleted')
    deleteTask(note)
  }
  const ShowDetails = (note) => {
    // console.log('show details clicked')
    setOpen(!open)
  }
  const copyUrl = (note) => {
    // console.log('copied')
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 5000)
  }
  return (
    <div
      className={`w-full flex justify-center items-center gap-2  rounded-md px-2  `}
    >
      {!open ? (
        <a
          href="/"
          onClick={() => handleNoteClick(note)}
          className="w-full  h-auto py-3 text-center  bg-secondary rounded-md  px-2  "
        >
          {note.title}
        </a>
      ) : (
        <div className="w-full text-[0.8em] font-serif flex justify-center gap-5 items-center  rounded-md px-1">
          <button
            onClick={() => copyUrl(note)}
            disabled={copy}
            className={` rounded-md  py-3 px-5 border-[1px] border-secondary flex  ${
              !copy && 'hover:bg-hover'
            } `}
          >
            <img
              src={copy ? copiedIcon : copyIcon}
              alt="copy"
              className="w-5"
            />
            {copy && <span className=" px-2 bg-primary">copied</span>}
          </button>
          <button
            onClick={() => handleDeleteTask(note)}
            className="rounded-md  hover:bg-hover py-3 px-5 border-[1px] border-secondary   "
          >
            <img src={deleteIcon} alt="delete" className="w-5" />
          </button>
        </div>
      )}

      <button
        onClick={() => ShowDetails(note)}
        className="rounded-md flex justify-center items-center bg-primary hover:bg-hover  px-3 py-1   "
      >
        <span className="flex items-center "> &#9776;</span>
      </button>
    </div>
  )
}
export default TodoCard
