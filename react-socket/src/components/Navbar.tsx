import { FunctionComponent } from "react";
import styled from "@emotion/styled";

const NavbarWrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: #2e9afe;
  display: flex;
  justify-content: center;
  .title {
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
  }
  margin-bottom: 20px;
`;

const Navbar: FunctionComponent = () => {
  return (
    <NavbarWrapper>
      <p className="title">Simple Chatting System</p>
    </NavbarWrapper>
  );
};

export default Navbar;
