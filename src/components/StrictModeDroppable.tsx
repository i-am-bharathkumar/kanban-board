import React, { useEffect, useState } from 'react';
import { Droppable, DroppableProps, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';

export const StrictModeDroppable: React.FC<DroppableProps> = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => cancelAnimationFrame(animation);
  }, []);

  if (!enabled) {
    return <div className="min-h-[200px]" />;
  }

  return (
    <Droppable {...props}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => children(provided, snapshot)}
    </Droppable>
  );
};