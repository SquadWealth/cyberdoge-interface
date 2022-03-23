import styled from "styled-components";
import TubbyCats from "../../assets/tubbycats.png";

const Container = styled.div`
  display: block;
  overflow-x: hidden !important;
`;

const Carousel = styled.img`
  position: absolute;
  bottom: 0;
  animation: moveSlideshow 100s linear infinite;
  height: 25%;

  @keyframes moveSlideshow {
    100% {
      transform: translateX(-66.6666%);
    }
  }
`

export const DynamicCarousel = () => {
  return (
    <Container>
      <Carousel src={TubbyCats} />
    </Container>
  )
}