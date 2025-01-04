import styled from 'styled-components';
import { device } from './breakpoints';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 60px;
  background-color: red;

  @media ${device.mobile} {
    padding: 12px;
  };
`;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  gap: 8px;
  padding: 8px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

const Button = styled.button`
  cursor: pointer;
  color: #4e4742;
  border: none;
  background-color: #e4e6e7;
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

const Cell = styled.div`
  background-color: #e3e5e6;
`;

const currDate = new Date();

function App() {

  return (
    <Container>
      <Header>
        <CurrentMonth>
          March 2018
        </CurrentMonth>
      </Header>
      <Main>
        {[...new Array(30)].map(() => <Cell></Cell>)}
        
      </Main>
    </Container>
  );
}

export default App
