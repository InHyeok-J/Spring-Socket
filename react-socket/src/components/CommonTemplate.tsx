import styled from "@emotion/styled";
import { FunctionComponent, ReactChildren } from "react";
import Navbar from "./Navbar";

const TemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  width: 368px;
  height: 700px;
  margin: 0 auto;
  border-radius: 40px;
  border: 2px rgba(0, 0, 0, 0.2) solid;
  box-shadow: 10px 10px 10px 5px gray;
  background-color: #ffffff;
  overflow: hidden;
`;

type TemplateProps = {
  children: JSX.Element | JSX.Element[];
};

const CommonTemplate: FunctionComponent<TemplateProps> = ({ children }) => {
  return (
    <TemplateWrapper>
      <Navbar />
      <Container>{children}</Container>
    </TemplateWrapper>
  );
};

export default CommonTemplate;
