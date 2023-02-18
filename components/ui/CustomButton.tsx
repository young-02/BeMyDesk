import React from 'react';
import styled from 'styled-components';
import { StringLiteral } from 'typescript';

interface CustomButtonProps {
  children?: React.ReactNode;
  backgoundColor?: string;
  fontSize?: string;
  paddingRow?: string;
  paddingColumns?: string;
  fonstColor?: string;
  onClick?: any;
}

export default function CustomButton({
  children,
  backgoundColor,
  fontSize,
  paddingRow,
  paddingColumns,
  fonstColor,
  onClick,
}: CustomButtonProps) {
  return (
    <Button
      backgoundColor={backgoundColor}
      paddingRow={paddingRow}
      paddingColumns={paddingColumns}
      fontSize={fontSize}
      onClick={onClick}
      fonstColor={fonstColor}
    >
      {children}
    </Button>
  );
}

const Button = styled.button<CustomButtonProps>`
  padding: ${(props) => props.paddingColumns}rem
    ${(props) => props.paddingRow}rem;
  color: ${(props) => props.fonstColor};
  background: ${(props) => props.backgoundColor};
  border: none;
  cursor: pointer;
`;
