import styled from 'styled-components';
import Cell from './components/Cell';
import useCalendar from './hooks/useCalendar';
import { getHolidays, getTaskListFromStorage, setTaskListToStorage } from './utils';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { useEffect, useState } from 'react';
import { setTaskList, TaskList } from './features/taskListSlice';
import EditTask from './components/EditTask';
import Header from './components/Header';
import useInput from './hooks/useInput';
import EmptyCell from './components/EmptyCell';

const Container = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-rows: 60px 30px 1fr;
  width: 100%;
  min-width: 768px;
  height: 100vh;
  user-select: none;
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
  grid-auto-rows: 1fr;
  overflow-y: hidden;
`;

function App() {
  const { title, showNext, showPrev, selectedYear, days: { prevMonth, selectedMonth, nextMonth }} = useCalendar();
  const [holidays, setHolidays] = useState<TaskList>({});
  const searchCtrl = useInput();
  const [searchStr] = searchCtrl;
  const dispatch = useAppDispatch();
  const taskList = useAppSelector(state => state.tasklist);

  useEffect(() => {
    const taskListFromStorage = getTaskListFromStorage();
    dispatch(setTaskList(taskListFromStorage));
  }, []);

  useEffect(() => {
    getHolidays(selectedYear).then(setHolidays);
  }, [selectedYear]);

  useEffect(() => {
    setTaskListToStorage(taskList);
  }, [taskList]);

  return (
    <Container>
      <Header {...{ title, showNext, showPrev, searchCtrl }} />
      <DaysOfWeek>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((day) => <span key={day}>{day}</span>)}
      </DaysOfWeek>
      <Main>
        {prevMonth.map((props) => <EmptyCell {...props} key={props.id} />)}
        {selectedMonth.map((props) => <Cell {...props} searchStr={searchStr} holidays={holidays[props.id]} key={props.id} />)}
        {nextMonth.map((props) => <EmptyCell {...props} key={props.id} />)}
      </Main>
      <EditTask />
    </Container>
  );
}

export default App;
