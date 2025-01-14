import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux-hooks";
import { Task as ITask } from '../types';
import { setDragTask, setDragToIndex } from "../features/draggingSlice";
import { deselectTask, setSelectedTask } from "../features/selectTaskSlice";

const Container = styled.div<{ $selected: boolean, $holiday: boolean }>`
  user-select: none;
  cursor: pointer;
  position: relative;
  display: flex;
  min-height: 24px;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  font-size: 13px;
  line-height: 1;
  border-radius: 4px;
  border: 1px solid ${({ $holiday, theme }) => $holiday ? theme.palette.primary.main : 'transparent'};

  ${({ $selected, theme }) => $selected && `
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
  `}
`;

const Draggable = styled.div<{ $selected: boolean }>`
  min-width: 24px;
  height: 100%;
  font-size: 18px;
  color: #858585;
  text-align: center;
  align-content: center;
  padding: 2px;

  ${({ $selected, theme }) => $selected && `
    color: ${theme.palette.primary.contrastText};
  `}
`;

const TaskTitle = styled.div<{ $pl: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  align-content: center;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1;
  padding: 4px 10px 4px ${({ $pl }) => $pl ? '10px;' : '0'};
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

export interface TaskProps {
  cellId: string;
  task: ITask;
  idx: number;
  holiday?: boolean;
  selected?: boolean;
  draggable?: boolean;
  selectable?: boolean;
}

function Task({
  cellId,
  task,
  idx,
  holiday = false,
  selected = false,
  draggable = true,
  selectable = true,
}: TaskProps) {
  const dispatch = useAppDispatch();

  const selectIndex = (toIdx: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(setDragToIndex(toIdx));
  }

  const draggableProps = {
    draggable: true,
    onDragStart: () => dispatch(setDragTask({ task, cellId, idx })),
    onDragEnd: () => dispatch(setDragTask(null)),
    onClick: () => selectable && (selected
      ? dispatch(deselectTask())
      : dispatch(setSelectedTask({ task }))
    ),
  }

  return (
    <Container $selected={selected} $holiday={holiday} {...draggable ? draggableProps : {}}>
      {draggable && <Draggable $selected={selected}>⠿</Draggable>}
      <TaskTitle $pl={!draggable}>{task.title}</TaskTitle>
      {
        draggable && (<>
          <TopHalf onDragEnter={selectIndex(idx)}/>
          <BottomHalf onDragEnter={selectIndex(idx + 1)}/>
        </>)
      }
    </Container>
  );
}

export default Task;