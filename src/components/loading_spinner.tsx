import styled, { keyframes } from 'styled-components';

const Container = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// min-height: ${(props) => props.size}rem;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ size: number; weight: number }>`
  height: ${(props) => props.size}rem;
  width: ${(props) => props.size}rem;
  border: ${(props) => props.weight}px solid #212121;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: ${rotation} 1s linear infinite;
`;

/**
 * Loading Spinner component.
 * @param height The height of the spinner container, not the actual spinner.
 */
const LoadingSpinner = ({ size, weight }: { size: number; weight: number }) => {
  return (
    <Container size={size}>
      <Spinner size={size} weight={weight}></Spinner>
    </Container>
  );
};

export default LoadingSpinner;
