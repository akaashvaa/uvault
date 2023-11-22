import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      createNewTaskFlag: false,

      createNewTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),

      updateTaskFlag: (flag) => set({ createNewTaskFlag: flag }),

      deleteTask: (task) =>
        set((state) => {
          const newTasks = state.tasks.filter((el) => el.id !== task.id)
          return { tasks: newTasks }
        }),
    }),
    {
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
