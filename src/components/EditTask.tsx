import styled, { css } from "styled-components";
import Backdrop from "./Backdrop";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { MouseEventHandler, useId } from "react";
import { closeEditor } from "../features/editTaskSlice";
import { createOrUpdateTask } from "../features/taskListSlice";
import { isWhitespace } from "../utils";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  background-color: #edeff1;
`;

const Title = styled.span`
  font-size: 24px;
  color: #4e4742;
  font-weight: bold;
`

const styles = css`
  width: 100%;
  height: 24px;
  font-size: 16px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #cecece;
  padding: 4px;
  font-family: sans-serif;
`

const Input = styled.input`${styles}`;

const Textarea = styled.textarea`
  ${styles}
  resize: none;
  height: 120px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  height: 32px;
  border-radius: 4px;
  padding: 0 16px;
  color: #4e4742;
  background-color: #e4e6e7;
  &:hover {
    background-color: #d1d6d6;
  }
`;

const CancelButton = styled(Button)`
  color: ${({ theme }) => theme.palette.danger.contrastText};
  background-color: ${({ theme }) => theme.palette.danger.main};

  &:hover {
    background-color: ${({ theme }) => theme.palette.danger.dark};
  }
`;

const SubmitButton = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background-color: ${({ theme }) => theme.palette.primary.main};

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

function EditTask() {
  const { task, cellId, editMode } = useAppSelector(state => state.editTask);
  const dispatch = useAppDispatch();
  const titleInputId = useId();
  const descriptionInputId = useId();

  const saveChanges = (formData: FormData) => {
    if (!task || !cellId) return;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    if (isWhitespace(title)) return alert(`Title can't be empty`);
    dispatch(createOrUpdateTask({ cellId, task: { ...task, title, description } }));
    dispatch(closeEditor());
  }

  const closeEditorHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    dispatch(closeEditor());
  }

  return (
    <Backdrop
      open={Boolean(task && cellId)}
      onClick={closeEditorHandler}
    >
      <Form action={saveChanges} onClick={(e) => e.stopPropagation()}>
        <Title>{editMode ? 'Edit task' : 'Create new task'}</Title>
        <div>
          <label htmlFor={titleInputId}>Title:</label>
          <Input name="title" id={titleInputId} defaultValue={task?.title} />
        </div>
        <div>
          <label htmlFor={descriptionInputId}>Description:</label>
          <Textarea name="description" id={descriptionInputId} defaultValue={task?.title} />
        </div>
        <ButtonsContainer>
          <CancelButton type="button" onClick={closeEditorHandler}>Cancel</CancelButton>
          <SubmitButton type="submit">Save</SubmitButton>
        </ButtonsContainer>
      </Form>
    </Backdrop>
  );
}

export default EditTask;
