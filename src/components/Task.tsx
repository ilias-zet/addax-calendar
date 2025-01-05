import { ReactNode } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 100%;
  min-height: 20px;
  background-color: #ffffff;
  font-size: 13px;
  line-height: 1;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  align-content: center;
`;

const GrabArea = styled.div`
  cursor: grab;
  min-width: 20px;
  min-height: 20px;
  font-size: 16px;
  color: #858585;
  text-align: center;
  align-content: center;
`;

const TaskText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface TaskProps {
  children: ReactNode;
}

function Task({ children }: TaskProps) {

  return (
    <Draggable>
      <Container>
        <GrabArea>⠿</GrabArea>
        <TaskText>{children}</TaskText>
      </Container>
    </Draggable>
  );
}

export default Task;