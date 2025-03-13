import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { RootState } from './store';
import { moveTask, setSearchQuery } from './store/kanbanSlice';
import Column from './components/Column';
import AddTaskModal from './components/AddTaskModal';
import { Plus, Search, LayoutGrid } from 'lucide-react';
import { TaskStatus } from './types';

const COLUMNS = [
  { id: TaskStatus.TODO, title: 'To Do' },
  { id: TaskStatus.IN_PROGRESS, title: 'In Progress' },
  { id: TaskStatus.PEER_REVIEW, title: 'Peer Review' },
  { id: TaskStatus.DONE, title: 'Done' }
];

function App() {
  const dispatch = useDispatch();
  const { tasks, searchQuery } = useSelector((state: RootState) => state.kanban);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = useCallback((result: DropResult) => {
    setIsDragging(false);
    if (!result.destination) return;

    const { draggableId, destination } = result;
    dispatch(moveTask({
      taskId: draggableId,
      newStatus: destination.droppableId as TaskStatus
    }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <LayoutGrid className="text-blue-500 mr-3" size={24} />
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kanban Board
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-1"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className={`flex gap-6 overflow-x-auto pb-6 pt-2 ${isDragging ? 'scale-[0.99] opacity-95' : ''} transition-all duration-300`}>
            {COLUMNS.map(column => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={filteredTasks.filter(task => task.status === column.id)}
              />
            ))}
          </div>
        </DragDropContext>

        {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}

export default App;