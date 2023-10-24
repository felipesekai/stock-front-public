import styled, {keyframes} from 'styled-components';
import {bgColor} from "../../utils/Colors";

const load = props => keyframes`
  0% {
    height: 0;
  }
  100% {
    height: ${props.altura+"px"};
  }
`;
export const DivAnimated = styled.div`
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid ${
    bgColor.bgPrimary
  }; /* Apenas para fins de demonstração */
  animation: ${load} 1.0s forwards;
`;

