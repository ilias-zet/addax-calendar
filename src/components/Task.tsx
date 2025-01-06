import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux-hooks";
import { Task as ITask } from '../types';
import { setDragTask } from "../features/draggingSlice";
import { useRef } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr;
  min-height: 24px;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  font-size: 13px;
  line-height: 1;
  border-radius: 4px;
`;

const GrabArea = styled.div`
  cursor: grab;
  width: 24px;
  height: 24px;
  font-size: 18px;
  color: #858585;
  text-align: center;
  align-content: center;
`;

const TaskTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  align-content: center;
`;

interface TaskProps {
  task: ITask;
}

function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container
      ref={ref}
      draggable={true}
      onDragStartCapture={() => dispatch(setDragTask(task))}
      onDragEndCapture={() => dispatch(setDragTask(null))}
    >
      <GrabArea>⠿</GrabArea>
      <TaskTitle
        draggable={true}
        onDragStart={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >{task.title}</TaskTitle>
    </Container>
  );
}

export default Task;