import styled from "styled-components";
import Task, { TaskProps } from "./Task";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Fragment } from "react/jsx-runtime";
import TaskSpace from "./TaskSpace";
import useDropZone from "../hooks/useDropZone";
import { daysInMonth } from "../utils";
import { createNewTask } from "../features/editTaskSlice";
import { Task as ITask } from "../types";

const Container = styled.div<{ $isCurrent: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: 4px;
  gap: 4px;
  background-color: #e3e5e6;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  transition: border 0.5s;
  border: 1px solid #cecece;
  ${({ $isCurrent, theme }) => $isCurrent ? `border: 2px solid ${theme.palette.primary.main};` : ''}

  &:hover {
    & button {
      opacity: 1;
    }
  }
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

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  gap: 2px;
  padding-top: 2px;
`;

const DraggableTaskWrapper = styled(TaskWrapper)`
  gap: 0px;
  padding-top: 0;
`;

const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  opacity: 0;
  transition: opacity 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

interface CellProps {
  id: string;
  date: Date;
  holidays?: ITask[];
  searchStr?: string;
  isCurrent?: boolean;
}

function Cell ({
  id,
  date,
  searchStr = '',
  holidays = [],
  isCurrent = false,
}: CellProps) {
  const taskList = useAppSelector(state => state.tasklist);
  const selectedTask = useAppSelector(state => state.selectTask.task);
  const dispatch = useAppDispatch();
  const tasks = taskList[id] || [];
  const { handlers: dropZoneHandlers, v } = useDropZone(id, tasks.length);

  const getDraggableTasks = () => {
    if (tasks.length === 0) return (<TaskSpace cellId={id} idx={0} key={`${id}-first-${v}`} />);
    else {
      return tasks
        .map((task, idx) => (
          <Fragment key={task.id}>
            <TaskSpace cellId={id} idx={idx} key={`${id}-top-${v}`} />
            <Task task={task} cellId={id} idx={idx} selected={task === selectedTask} />
          </Fragment>
        ))
        .concat(<TaskSpace cellId={id} idx={tasks.length} key={`${id}-last-${v}`} />);
    }
  }

  const getTasks = (tasks: ITask[], props: Partial<TaskProps> = {}) => {
    return tasks.map((task, idx) => (
      <Task
        idx={idx}
        key={task.id}
        task={task}
        cellId={id}
        draggable={false}
        {...props}
      />
    ));
  }

  const searchResults = searchStr && tasks.filter(task => task.title.toLowerCase().includes(searchStr.toLocaleLowerCase()));

  const day = date.getDate();
  const dateTitle = day === 1 || day === daysInMonth(date)
    ? date.toLocaleString('default', { month: 'short', day: 'numeric' })
    : day;

  return (
    <Container $isCurrent={isCurrent}>
      <Heading>
        <Date $isCurrent={isCurrent}>{dateTitle}</Date>
        <AddTaskButton onClick={() => dispatch(createNewTask({ cellId: id }))}>+</AddTaskButton>
      </Heading>
      <DropZone {...dropZoneHandlers}>
        {!!holidays.length && <TaskWrapper>{getTasks(holidays, { holiday: true })}</TaskWrapper>}
        {
          searchResults
            ? <TaskWrapper>{getTasks(searchResults)}</TaskWrapper>
            : <DraggableTaskWrapper>{getDraggableTasks()}</DraggableTaskWrapper>
        }
      </DropZone>
    </Container>
  );
}

export default Cell;