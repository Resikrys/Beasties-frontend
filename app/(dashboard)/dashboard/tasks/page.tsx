import { TaskList } from "@/components/tasks/task-list"

export default function TasksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Training Tasks</h1>
      <TaskList />
    </div>
  )
}
