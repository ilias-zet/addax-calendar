import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux-hooks";
import { Task as ITask } from '../types';
import { setDragTask, setDragToIndex } from "../features/draggingSlice";

const Container = styled.div`
  cursor: grab;
  position: relative;
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

const Grabbable = styled.div`
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
  white-space: nowrap;
`;

const TopHalf = styled.div`
  position: absolute;
  height: 50%;
  width: 100%;
  top: 0;
`;

const BottomHalf = styled(TopHalf)`
  top: unset;
  bottom: 0;
`;

interface TaskProps {
  cellId: string;
  task: ITask;
  idx: number;
}

function Task({ cellId, task, idx }: TaskProps) {
  const dispatch = useAppDispatch();

  const selectIndex = (toIdx: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setDragToIndex(toIdx));
  }

  return (
    <Container
      draggable={true}
      onDragStart={() => dispatch(setDragTask({ task, cellId, idx }))}
      onDragEnd={() => dispatch(setDragTask(null))}
    >
      <Grabbable>⠿</Grabbable>
      <TaskTitle>{task.title}</TaskTitle>
      <TopHalf onDragEnter={selectIndex(idx)}/>
      <BottomHalf onDragEnter={selectIndex(idx + 1)}/>
    </Container>
  );
}

export default Task;