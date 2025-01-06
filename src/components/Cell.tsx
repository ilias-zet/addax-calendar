import styled from "styled-components";
import Task from "./Task";
import { Task as ITask } from "../types";
import { useAppSelector } from "../hooks/redux-hooks";

const Container = styled.div<{ $disabled: boolean, $isCurrent: boolean }>`
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

  ${({$disabled}) =>  $disabled ? 'background-color: #ebebeb;' : 'border: 1px solid #cecece;'}
  ${({$isCurrent}) => $isCurrent ? 'border: 2px solid red' : ''}
   
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding-right: 4px;
`;

const Day = styled.div<{ $isCurrent: boolean }>`
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

const DragArea = styled.div<{ $showBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  min-height: 0;
  border-radius: 4px;
  overflow-y: auto;
  gap: 2px;
  ${({ $showBorder }) => $showBorder ? 'border: 1px dashed red;' : ''}
`;

interface CellProps {
  day: number;
  isCurrent?: boolean;
  disabled?: boolean;
  tasks?: ITask[];
}

function Cell ({
  day,
  isCurrent = false,
  disabled = false,
  tasks = [],
}: CellProps) {
  const draggingTask = useAppSelector(state => state.dragging.task);

  return (
    <Container $disabled={disabled} $isCurrent={isCurrent}>
      <Heading>
        <Day $isCurrent={isCurrent}>{day}</Day>
        { !disabled && tasks.length ? <CardsNumber>{tasks.length} card(s)</CardsNumber> : null }
      </Heading>
        <DragArea $showBorder={draggingTask && !disabled}>
          { tasks.map((task) => <Task key={task.id} task={task}></Task>) }
        </DragArea>
    </Container>
  );
}

export default Cell;