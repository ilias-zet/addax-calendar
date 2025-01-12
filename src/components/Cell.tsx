import styled from "styled-components";
import Task from "./Task";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Fragment } from "react/jsx-runtime";
import TaskSpace from "./TaskSpace";
import useDropZone from "../hooks/useDropZone";
import { daysInMonth } from "../utils";
import { createNewTask } from "../features/editTaskSlice";

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
  ${({ $isCurrent, theme }) => $isCurrent ? `border: 2px solid ${theme.palette.primary.main};` : ''}
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
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
  padding: 0 4px;

  ${({ $isCurrent, theme }) => $isCurrent 
      ? `
        color: ${theme.palette.primary.contrastText};
        background-color: ${theme.palette.primary.main};
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

const AddTaskButton = styled.button`
  padding: 0;
  margin: 0;
  width: 24px;
  height: 24px;
  align-content: center;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #e3e5e6;
  color: #4e4742;
  font-weight: bold;

  &:hover {
    background-color: #d7d7d7;
  }
`;

interface CellProps {
  id: string;
  date: Date;
  isCurrent?: boolean;
  disabled?: boolean;
}

function Cell ({
  id,
  date,
  isCurrent = false,
  disabled = false,
}: CellProps) {
  const { handlers: dropZoneHandlers, v } = useDropZone(id);
  const taskList = useAppSelector(state => state.tasklist);
  const dispatch = useAppDispatch();
  const tasks = taskList[id] || [];

  const getTasks = () => {
    if (tasks.length === 0) return (<TaskSpace cellId={id} idx={0} key={`${id}-first-${v}`} />);
    else {
      return tasks
        .map((task, idx) => (
          <Fragment key={task.id}>
            <TaskSpace cellId={id} idx={idx} key={`${id}-top-${v}`} />
            <Task task={task} cellId={id} idx={idx} />
          </Fragment>
        ))
        .concat(<TaskSpace cellId={id} idx={tasks.length} key={`${id}-last-${v}`} />);
    }
  }

  const day = date.getDate();
  const dateTitle = day === 1 || day === daysInMonth(date)
    ? date.toLocaleString('default', { month: 'short', day: 'numeric' })
    : day;

  return (
    <Container $disabled={disabled} $isCurrent={isCurrent}>
      <Heading>
        <Date $isCurrent={isCurrent}>{dateTitle}</Date>
        { !disabled && tasks.length ? <CardsNumber>{tasks.length} card(s)</CardsNumber> : null }
        <AddTaskButton onClick={() => dispatch(createNewTask({ cellId: id }))}>︙</AddTaskButton>
      </Heading>
        <DropZone {...dropZoneHandlers}>
          {getTasks()}
        </DropZone>
    </Container>
  );
}

export default Cell;