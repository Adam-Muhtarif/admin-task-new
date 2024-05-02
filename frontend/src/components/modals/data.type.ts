interface ICategoryInputsType {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IPostInputsType {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  category?: ICategoryInputsType | null;
}

interface IInputsType {
  id?: number | undefined;
  name?: string;
  title?: string;
  content?: string;
  categoryId?: number | null;
}

interface IAddModalProps {
  refetch: () => void;
  opened: boolean;
  open: () => void;
  close: () => void;
}

interface IUpdateModalProps {
  refetch: () => void;
  opened: boolean;
  close: () => void;
  updateInputs: IInputsType | null;
  setUpdateInputs: React.Dispatch<React.SetStateAction<IInputsType | null>>;
}

interface ICategorySelectType {
  key: number;
  label: string;
  value: string;
}
