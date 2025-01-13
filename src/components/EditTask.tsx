import styled, { css } from "styled-components";
import Backdrop from "./Backdrop";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { FormEventHandler, MouseEventHandler, useId } from "react";
import { closeEditor } from "../features/editTaskSlice";
import { createOrUpdateTask } from "../features/taskListSlice";
import { isWhitespace } from "../utils";
import Button from "./Button";

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

function EditTask() {
  const { task, cellId, editMode } = useAppSelector(state => state.editTask);
  const dispatch = useAppDispatch();
  const titleInputId = useId();
  const descriptionInputId = useId();

  const saveChanges: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!task || !cellId) return;
    const formData = new FormData(e.currentTarget);
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
      <Form onSubmit={saveChanges} onClick={(e) => e.stopPropagation()}>
        <Title>{editMode ? 'Edit task' : 'Create new task'}</Title>
        <div>
          <label htmlFor={titleInputId}>Title:</label>
          {task && <Input name="title" id={titleInputId} defaultValue={task.title} />}
        </div>
        <div>
          <label htmlFor={descriptionInputId}>Description:</label>
          {task && <Textarea name="description" id={descriptionInputId} defaultValue={task.description} />}
        </div>
        <ButtonsContainer>
          <Button color="danger" type="button" variant="outlined" onClick={closeEditorHandler}>Cancel</Button>
          <Button type="submit">Save</Button>
        </ButtonsContainer>
      </Form>
    </Backdrop>
  );
}

export default EditTask;
