import React from 'react';
import { Task } from '../types';
import { Draggable } from "@hello-pangea/dnd";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  // Map status to color
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'border-l-blue-400';
      case 'inProgress':
        return 'border-l-yellow-400';
      case 'peerReview':
        return 'border-l-purple-400';
      case 'done':
        return 'border-l-green-400';
      default:
        return 'border-l-gray-400';
    }
  };

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white p-4 rounded-lg border-l-4 ${getStatusColor(task.status)}
            mb-3 hover:shadow-md transition-all duration-300 
            ${snapshot.isDragging 
              ? 'shadow-lg rotate-2 scale-105 opacity-90 z-10' 
              : 'shadow-sm'}
            transform hover:-translate-y-1 cursor-grab active:cursor-grabbing
          `}
        >
          <h3 className="font-semibold text-gray-800 mb-2 truncate">{task.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{task.description}</p>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
              ID: {task.id.slice(0, 6)}
            </span>
            <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-bold">
              {task.title.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;