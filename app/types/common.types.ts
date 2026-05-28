import { IBaseTheme, ITheme } from "./theme.types";

export interface AppThemeContextProps {
  theme: ITheme;
  selectedTheme: IBaseTheme;
  changeTheme: (theme: IBaseTheme) => void;
}

export interface SheetModalRef {
  open: () => void;
  close: () => void;
}