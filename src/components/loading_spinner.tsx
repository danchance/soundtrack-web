import styled, { keyframes } from 'styled-components';

const Container = styled.div<{ height: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${(props) => props.height}em;
`;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: ${rotation} 1s linear infinite;
`;

/**
 * Loading Spinner component.
 * @param height The height of the spinner container, not the actual spinner.
 */
const LoadingSpinner = ({ height }: { height: number }) => {
  return (
    <Container height={height}>
      <Spinner></Spinner>
    </Container>
  );
};

export default LoadingSpinner;
