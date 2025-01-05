import styled from "styled-components";
import Task from "./Task";

const Container = styled.div<{ $disabled: boolean, $isCurrent: boolean }>`
  display: grid;
  grid-template-rows: 24px 1fr;
  padding: 4px;
  border-radius: 4px;
  gap: 4px;
  background-color: #e3e5e6;
  min-width: 0;
  min-height: 0;

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

const DragArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  overflow-y: auto;
  gap: 2px;
`;

interface CellProps {
  day: number;
  isCurrent?: boolean;
  disabled?: boolean;
  tasks?: string[];
}

function Cell ({
  day,
  isCurrent = false,
  disabled = false,
  tasks = [],
}: CellProps) {
  return (
    <Container $disabled={disabled} $isCurrent={isCurrent}>
      <Heading>
        <Day $isCurrent={isCurrent}>{day}</Day>
        { !disabled && tasks.length ? <CardsNumber>{tasks.length} card(s)</CardsNumber> : null }
      </Heading>
        <DragArea>
          {tasks.map(task => <Task key={task}>{task}</Task>)}
        </DragArea>
    </Container>
  );
}

export default Cell;