import styled from 'styled-components';

export const Frame = styled.div`
  background-color: #e8f4ff;
  border-radius: 30px;
  padding: 20px;
  color: #3d3d3d;
  box-shadow: 6px 8px 18px -8px rgba(75, 97, 105, 0.62);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 6px 8px 18px 0px rgba(75, 97, 105, 0.62);
  }
  a {
    color: #2590f5;
    text-decoration: none;
  }
`;
