import styled from "styled-components";
import CyberDoge_Carousel from "../../assets/carousel.png";

const Container = styled.div`
  display: block;
  overflow-x: hidden !important;
`;

const Carousel = styled.img`
  position: absolute;
  bottom: 0;
  animation: moveSlideshow 100s linear infinite;
  height: 30%;

  @keyframes moveSlideshow {
    100% {
      transform: translateX(-66.6666%);
    }
  }
`

export const DynamicCarousel = () => {
  return (
    <Container>
      <Carousel src={CyberDoge_Carousel} />
    </Container>
  )
}