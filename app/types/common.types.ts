import { ITheme } from "./theme.types";

export interface AppThemeContextProps {
  theme: ITheme;
  changeTheme: (theme: ITheme) => void;
}

export interface SheetModalRef {
  open: () => void;
  close: () => void;
}