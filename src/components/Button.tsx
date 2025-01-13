import styled from "styled-components";
import theme, { ThemePaletteColor } from "../theme";

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'contained' | 'outlined';

const buttonSizeStyle = {
  small: {
    height: '32px',
    padding: '4px 5px'
  },
  medium: {
    height: '40px',
    padding: '6px 8px'
  },
  large: {
    height: '48px',
    padding: '8px 11px'
  }
}

const buttonVariantStyle = (color: ThemePaletteColor, variant: ButtonVariant) => ({
  contained: {
    bg: theme.palette[color].main,
    color: theme.palette[color].contrastText,
    border: 'none',
    hoverBg: theme.palette[color].dark,
  },
  outlined: {
    bg: 'none',
    color: theme.palette[color].main,
    border: `1px solid ${theme.palette[color].main}`,
    hoverBg: '#00000010',
  }
})[variant];

const ButtonBase = styled.button<{ $color: ThemePaletteColor, $size: ButtonSize, $variant: ButtonVariant }>`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  min-width: 60px;
  height: ${({ $size }) => buttonSizeStyle[$size].height};
  padding: ${({ $size }) => buttonSizeStyle[$size].padding};  
  color: ${({ $color, $variant }) => buttonVariantStyle($color, $variant).color};
  background-color: ${({ $color, $variant }) => buttonVariantStyle($color, $variant).bg};
  border: ${({ $color, $variant }) => buttonVariantStyle($color, $variant).border};

  &:hover {
    background-color: ${({ $color, $variant }) => buttonVariantStyle($color, $variant).hoverBg};
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ThemePaletteColor;
  size?: ButtonSize;
}

function Button({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) {
  return <ButtonBase
    $color={color}
    $size={size}
    $variant={variant}
    {...props}
  >{children}</ButtonBase>
}

export default Button;