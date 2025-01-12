import { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

const BackdropElement = styled.div<{ $open?: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000b4;
  transition: opacity 0.3s;
  opacity: ${({ $open }) => $open ? 1 : 0};
  pointer-events: ${({ $open }) => $open ? 'all' : 'none'};
`;

interface BackdropProps {
  open?: boolean;
  children?: ReactNode | ReactNode[];
  onClick?: MouseEventHandler;
}

function Backdrop({ children, open, onClick }: BackdropProps) {
  return <BackdropElement onClick={onClick} $open={open}>{children}</BackdropElement>
}

export default Backdrop;