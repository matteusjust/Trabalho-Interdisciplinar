import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px; 
  height: 350px;
  padding: 20px;
  border: 1px solid #1A202C;
  border-radius: 8px;
  background-color: #1A202C;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 100px auto;
  gap: 15px; 
`;

export const Title = styled.h2`
  color: white;
  font-size: 30px;
`;

export const TextArea = styled.textarea`
  width: 70%;
  padding: 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 15px; 
`;

export const LabelError = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

export const LabelSuccess = styled.div`
  color: green;
  font-size: 14px;
  margin-top: 10px;
`;

export const Flex = styled.div`
  display: flex;
  gap: ${(props) => props.gap || "0px"};
  width: ${(props) => props.width || "100%"};
`;

export const BaseButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  background: ${(props) => props.background};
  transition: background 0.3s ease;
  margin-top: 10px;

  &:hover {
    background: ${(props) => props.hoverBackground};
  }
`;
