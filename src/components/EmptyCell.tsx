import styled from "styled-components";
import { daysInMonth } from "../utils";

const Container = styled.div`
  display: flex;
  padding: 4px;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-color: #ebebeb;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 24px;
  font-size: 14px;
  line-height: 1;
  font-weight: 700;
  padding: 0 4px;
  color: #a5a5a5;
`;

function EmptyCell ({ date }: { date: Date }) {
  const day = date.getDate();
  const dateTitle = day === 1 || day === daysInMonth(date)
    ? date.toLocaleString('default', { month: 'short', day: 'numeric' })
    : day;

  return (
    <Container>
      <Date>{dateTitle}</Date>
    </Container>
  );
}

export default EmptyCell;