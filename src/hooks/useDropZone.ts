import { DragEventHandler, useRef, useState } from "react";
import { setDragOverCell, setDragToIndex } from "../features/draggingSlice";
import { moveTask } from "../features/taskListSlice";
import { isMovementAllowed } from "../utils";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

const useDropZone = (cellId: string, lastIdx: number) => {
  const counterRef = useRef<number>(0); // used to preventing drag event from firing on child elements 
  const [v, setV] = useState(0); // version of task order in current cell
  const dispatch = useAppDispatch();
  const dragToIndex = useAppSelector(state => state.dragging.toIndex);
  const taskData = useAppSelector(state => state.dragging.taskData);

  const onDragEnter: DragEventHandler = (e) => {
    e.preventDefault();
    counterRef.current++;
    if (counterRef.current === 1) {
      dispatch(setDragOverCell(cellId));
      dispatch(setDragToIndex(lastIdx));
    }
  }
  const onDragLeave: DragEventHandler = (e) => {
    e.preventDefault();
    counterRef.current--;
    if (counterRef.current === 0) {
      dispatch(setDragOverCell(null));
    }
  }
  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();
  }
  const onDrop: DragEventHandler = (e) => {
    e.preventDefault();
    counterRef.current = 0;
    dispatch(setDragOverCell(null));
    const movementAllowed = taskData && isMovementAllowed(taskData.cellId, cellId, taskData.idx, dragToIndex);
    if (movementAllowed) {
      setV(prev => prev + 1);
      dispatch(moveTask({
        fromCell: taskData.cellId,
        toCell: cellId,
        fromIdx: taskData.idx,
        toIdx: dragToIndex,
      }));
    }
  }

  return { 
    handlers: { onDragEnter, onDragLeave, onDragOver, onDrop },
    v,
  };
}

export default useDropZone;