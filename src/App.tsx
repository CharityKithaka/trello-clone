import { AppContainer } from "./styles";
import { AddItemButton } from "./components/AddNewItem";
import { Column } from "./components/Column";
import { useAppState } from "./state/AppStateContext";
import { CustomDragLayer } from "./components/CustomDragLayer";
import { addList } from "./state/actions";

export const App = () => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddItemButton
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};

export default App;
