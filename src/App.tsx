import styled from 'styled-components';
import { device } from './breakpoints';
import Cell from './components/Cell';
import useCalendar from './hooks/useCalendar';
import { getDateString } from './utils';

const Container = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-rows: 60px 30px 1fr;
  width: 100%;
  height: 100vh;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 120px auto 120px;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 60px;

  @media ${device.mobile} {
    padding: 12px;
  };
`;

const DaysOfWeek = styled.div`
  width: 100%;
  min-height: 30px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(7, 1fr);
  font-size: 14px;
  color: #4e4742;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 8px;
  padding: 8px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 2fr);
  overflow-y: hidden;
`;

const Button = styled.button`
  cursor: pointer;
  color: #4e4742;
  border: none;
  background-color: #e4e6e7;
  border: 1px solid #cecece;
  height: 32px;
  border-radius: 4px;
  padding: 0 16px;

  &:hover {
    background-color: #d1d6d6;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CurrentMonth = styled.span`
  font-size: 18px;
  font-weight: 700;
  justify-self: center;
  margin: 0;
  color: #4e4742;
`;

const tasks = {
  [getDateString(new Date())]: ['kekdjaiowufdkauwhdjiawdawdoij', 'lol', 'awdawdawuhidyaihowjkda', 'awdkhjawkdawdlkamnjwda', 'aiojwhuydggawfjoahlwiudajwd'],
}

function App() {
  const { title, showNext, showPrev, days: { prevMonth, selectedMonth, nextMonth }} = useCalendar();

  return (
    <Container>
      <Header>
        <ButtonsWrapper>
          <Button onClick={showPrev}>▲</Button>
          <Button onClick={showNext}>▼</Button>
        </ButtonsWrapper>
        <CurrentMonth>
          {title}
        </CurrentMonth>
      </Header>
      <DaysOfWeek>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => <span key={day}>{day}</span>)}
      </DaysOfWeek>
      <Main>
        {prevMonth.map(({ day, key, disabled }) => <Cell {...{day, disabled}} key={key}></Cell>)}
        {selectedMonth.map(({ day, key, isCurrent }) => <Cell {...{day, isCurrent, tasks: tasks[key]}} key={key}></Cell>)}
        {nextMonth.map(({ day, key, disabled }) => <Cell {...{day, disabled}} key={key}></Cell>)}
      </Main>
    </Container>
  );
}

export default App;
