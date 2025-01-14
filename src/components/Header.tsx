import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import Button from "./Button";
import { deleteTask } from "../features/taskListSlice";
import { deselectTask } from "../features/selectTaskSlice";
import { MouseEventHandler } from "react";
import { editTask } from "../features/editTaskSlice";
import { getTaskInfo } from "../utils";
import useInput from "../hooks/useInput";

const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 60px;
  padding: 0 16px;
`;

const FlexWrapper = styled.div<{ $justifyEnd?: boolean }>`
  display: flex;
  ${({ $justifyEnd }) => $justifyEnd && 'justify-content: flex-end;'}
  gap: 8px;
`;

const CurrentMonth = styled.span`
  font-size: 18px;
  font-weight: 700;
  justify-self: center;
  margin: 0;
  color: #4e4742;
`;

const Input = styled.input`
  font-size: 14px;
  height: 32px;
  outline: none;
  width: 300px;
  border-radius: 4px;
  padding: 4px;
  border: none;
  outline: 1px solid ${({ theme }) => theme.palette.primary.main};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.primary.main};
  }
`;

interface HeaderProps {
  title: string;
  showNext: MouseEventHandler<HTMLButtonElement>;
  showPrev: MouseEventHandler<HTMLButtonElement>;
  searchCtrl: ReturnType<typeof useInput>;
}

function Header({
  title,
  showNext,
  showPrev,
  searchCtrl,
}: HeaderProps) {
  const selectedTask = useAppSelector(state => state.selectTask.task);
  const dispatch = useAppDispatch();
  const [searchStr, onInputChange] = searchCtrl;

  const deleteTaskClickHandler = () => {
    const confirmation = confirm('Are you sure you want do delete selected task?');
    if (!selectedTask || !confirmation) return;
    dispatch(deleteTask(selectedTask));
    dispatch(deselectTask());
  }

  const editTaskClickHandler = () => {
    if (!selectedTask) return;
    const { cellId } = getTaskInfo(selectedTask.id);
    dispatch(editTask({ task: selectedTask, cellId }));
    dispatch(deselectTask());
  }

  return (
    <Container>
      <FlexWrapper>
        <Button size='small' onClick={showPrev}>▲</Button>
        <Button size='small' onClick={showNext}>▼</Button>
      </FlexWrapper>
      <CurrentMonth>{title}</CurrentMonth>
      <FlexWrapper $justifyEnd>
        {
          selectedTask 
            ? (<>
              <Button size='small' color='danger' variant='outlined' onClick={() => dispatch(deselectTask())}>Cancel</Button>
              <Button size='small' color='danger' onClick={deleteTaskClickHandler}>Delete</Button>
              <Button size='small' onClick={editTaskClickHandler}>Edit</Button>
            </>)
            : <Input placeholder="Search" onChange={onInputChange} value={searchStr} />
        }
      </FlexWrapper>
    </Container>
  );
}

export default Header;