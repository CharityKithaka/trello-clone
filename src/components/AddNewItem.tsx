import { useState } from "react";
import { AddItemButton as StyledAddItemButton } from "../styles";
import { NewItemForm } from "./NewItemForm";

type AddNewItemProps = {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const AddItemButton = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <StyledAddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </StyledAddItemButton>
  );
};
