import styled from "styled-components";

export const StyledProduct = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  h2 {
    padding: 10px 0;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  cursor: pointer;
`;
