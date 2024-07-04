'use client';
import { createTheme } from '@mui/material/styles';
import {
  BACKGROUND_COLOR_MAIN,
  BACKGROUND_COLOR_SECONDARY,
  DARK_BACKGROUND_COLOR_MAIN,
  DARK_BACKGROUND_COLOR_SECONDARY,
  DARK_PRIMARY_COLOR,
  DARK_SECONDARY_COLOR,
  DARK_TEXT_COLOR_LABELS,
  DARK_TEXT_COLOR_MAIN,
  ERROR_COLOR,
  FONT,
  INFO_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR_LABELS,
  TEXT_COLOR_MAIN,
  TEXT_COLOR_SECONDARY,
} from '../constants';

export const lightThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    background: {
      default: BACKGROUND_COLOR_MAIN,
      paper: BACKGROUND_COLOR_SECONDARY,
    },
    text: {
      primary: TEXT_COLOR_MAIN,
      secondary: TEXT_COLOR_SECONDARY,
    },
    error: {
      main: ERROR_COLOR,
    },
    info: {
      main: INFO_COLOR,
    },
  },
  typography: {
    fontFamily: FONT,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
        variant: 'outlined',
        InputLabelProps: {
          style: {
            color: TEXT_COLOR_LABELS,
          },
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: BACKGROUND_COLOR_SECONDARY,
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: BACKGROUND_COLOR_SECONDARY,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: '15px',
          fontWeight: '600',
        },
      },
    },
  },
});

export const darkThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: DARK_PRIMARY_COLOR,
    },
    secondary: {
      main: DARK_SECONDARY_COLOR,
    },
    background: {
      default: DARK_BACKGROUND_COLOR_MAIN,
      paper: DARK_BACKGROUND_COLOR_SECONDARY,
    },
    text: {
      primary: DARK_TEXT_COLOR_MAIN,
    },
    error: {
      main: ERROR_COLOR,
    },
    info: {
      main: INFO_COLOR,
    },
  },
  typography: {
    fontFamily: FONT,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'primary',
        variant: 'outlined',
        InputLabelProps: {
          style: {
            color: DARK_TEXT_COLOR_LABELS,
          },
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: DARK_BACKGROUND_COLOR_SECONDARY,
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: DARK_BACKGROUND_COLOR_SECONDARY,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: '15px',
          fontWeight: '600',
        },
      },
    },
  },
});
