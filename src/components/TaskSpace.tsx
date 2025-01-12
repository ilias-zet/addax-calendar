import styled from "styled-components";
import { useAppSelector } from "../hooks/redux-hooks";
import { isMovementAllowed } from "../utils";

const Space = styled.div<{ $active: boolean }>`
  width: 100%;
  min-height: 0px;
  border: 1px dashed;
  border-radius: 4px;
  transition: margin 0.3s, min-height 0.3s, border-color 0.5s;
  margin: 0;

  ${({ $active, theme }) => $active
    ? `
      min-height: 24px;
      border-color: ${theme.palette.primary.main};
      margin: 2px 0;

      &:first-child {
        margin: 0 0 2px;
      }
    ` 
    : 'border-color: transparent'};
`;

interface TaskSpaceProps {
  idx: number;
  cellId: string;
}

function TaskSpace({ idx, cellId }: TaskSpaceProps) {
  const taskData = useAppSelector(state => state.dragging.taskData);
  const dragToIndex = useAppSelector(state => state.dragging.toIndex);
  const dragOverCell = useAppSelector(state => state.dragging.overCell);

  const movementAllowed = !!taskData && isMovementAllowed(taskData.cellId, cellId, taskData.idx, idx);
  const isDragOverCurrentCell = dragOverCell === cellId;
  const active = movementAllowed && isDragOverCurrentCell && idx === dragToIndex;

  return (
    <Space $active={active} />
  );
}

export default TaskSpace;