import styled from "styled-components";
import Task from "./Task";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Fragment } from "react/jsx-runtime";
import { setDragOverCell, setDragToIndex } from "../features/draggingSlice";
import { useRef } from "react";
import TaskSpace from "./TaskSpace";
import { isMovementAllowed } from "../utils";
import { moveTask } from "../features/taskListSlice";

const Container = styled.div<{ $disabled: boolean, $isCurrent: boolean }>`
  position: relative;
  display: grid;
  grid-template-rows: 24px 1fr;
  padding: 4px;
  border-radius: 4px;
  gap: 4px;
  background-color: #e3e5e6;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  transition: border 0.5s;

  ${({ $disabled }) =>  $disabled ? 'background-color: #ebebeb;' : 'border: 1px solid #cecece;'}
  ${({ $isCurrent }) => $isCurrent ? 'border: 2px solid red;' : ''}
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding-right: 4px;
`;

const Date = styled.div<{ $isCurrent: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: fit-content;
  min-width: 24px;
  font-size: 14px;
  line-height: 1;
  font-weight: 700;
  border-radius: 12px;

  ${({ $isCurrent }) => $isCurrent 
      ? `
        color: #ffffff;
        background-color: red;
      `
      : 'color: #4d4f51;'
  }
`;

const CardsNumber = styled.span`
  font-size: 12px;
  color: #858585;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 0;
  border-radius: 4px;
  overflow-y: auto;
`;

interface CellProps {
  id: string;
  date: number;
  isCurrent?: boolean;
  disabled?: boolean;
}

function Cell ({
  id,
  date,
  isCurrent = false,
  disabled = false,
}: CellProps) {
  const counterRef = useRef<number>(0);
  const dispatch = useAppDispatch();
  const dragToIndex = useAppSelector(state => state.dragging.toIndex);
  const taskData = useAppSelector(state => state.dragging.taskData);
  const taskList = useAppSelector(state => state.tasklist);
  const tasks = taskList[id] || [];

  return (
    <Container $disabled={disabled} $isCurrent={isCurrent}>
      <Heading>
        <Date $isCurrent={isCurrent}>{date}</Date>
        { !disabled && tasks.length ? <CardsNumber>{tasks.length} card(s)</CardsNumber> : null }
      </Heading>
        <DropZone
          onDragEnterCapture={(e) => {
            e.preventDefault();
            counterRef.current++;
            if (counterRef.current === 1) {
              dispatch(setDragOverCell(id));
              dispatch(setDragToIndex(0));
            }
          }}
          onDragLeave={() => {
            counterRef.current--;
            if (counterRef.current === 0) {
              dispatch(setDragOverCell(null));
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            counterRef.current = 0;
            dispatch(setDragOverCell(null));
            const movementAllowed = taskData && isMovementAllowed(taskData.cellId, id, taskData.idx, dragToIndex);
            if (movementAllowed) {
              dispatch(moveTask({
                fromCell: taskData.cellId,
                toCell: id,
                fromIdx: taskData.idx,
                toIdx: dragToIndex,
              }));
            }
          }}
        >
          <TaskSpace cellId={id} idx={0} />
          {
            tasks.map((task, idx) => (
              <Fragment key={task.id}>
                { idx !== 0 ? <TaskSpace cellId={id} idx={idx} /> : null }
                <Task task={task} cellId={id} idx={idx} />
                { idx === tasks.length - 1 ? <TaskSpace cellId={id} idx={idx + 1} /> : null }
              </Fragment>
            ))
          }
        </DropZone>
    </Container>
  );
}

export default Cell;