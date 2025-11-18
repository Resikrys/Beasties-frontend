import { TaskList } from "@/components/tasks/task-list"

export default function TasksPage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/images/relax_bg.webp')" }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">Training Tasks</h1>
        <TaskList />
      </div>
    </div>
  )
}
