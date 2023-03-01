import React from 'react';
import styled from 'styled-components';

function SnsNickname() {
  return (
    <StyledBackground>
      <StyledDiv></StyledDiv>
    </StyledBackground>
  );
}
const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background: url(https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
    no-repeat center;
  background-size: cover;

  /* div {
    border: .0625rem solid black;
  } */
`;

const StyledDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 36.75rem;
  height: 44.75rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;
`;
export default SnsNickname;
