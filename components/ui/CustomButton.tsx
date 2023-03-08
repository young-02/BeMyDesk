import React from 'react';
import styled from 'styled-components';
import { StringLiteral } from 'typescript';

interface CustomButtonProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  fontSize?: string;
  paddingRow?: string;
  paddingColumns?: string;
  fontColor?: string;
  fontFamily?: string;
  onClick?: any;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  margin?: string;
  fontWeight?: string;
  disabled?: boolean;
  color?: string;
}

export default function CustomButton({
  children,
  backgroundColor,
  fontSize,
  fontFamily,
  paddingRow,
  paddingColumns,
  fontColor,
  onClick,
  border,
  borderRadius,
  width,
  height,
  margin,
  fontWeight,
  disabled,
  color,
}: CustomButtonProps) {
  return (
    <Button
      backgroundColor={backgroundColor}
      paddingRow={paddingRow}
      paddingColumns={paddingColumns}
      fontSize={fontSize}
      fontFamily={fontFamily}
      onClick={onClick}
      fontColor={fontColor}
      border={border}
      borderRadius={borderRadius}
      width={width}
      height={height}
      margin={margin}
      fontWeight={fontWeight}
      disabled={disabled}
      color={color}
    >
      {children}
    </Button>
  );
}

const Button = styled.button<CustomButtonProps>`
  padding: ${(props) => props.paddingColumns}rem
    ${(props) => props.paddingRow}rem;
  color: ${(props) => props.fontColor};
  background: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius ?? 0.625}rem;
  cursor: pointer;
  border: ${(props) => props.border};
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  margin: ${(props) => props.margin}rem;
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}rem;
  color: ${(props) => props.color};
  font-family: ${(props) => props.fontFamily ?? 'Pretendard Variable'};
`;
