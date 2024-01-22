import { ColumnContainer, ColumnTitle } from "../styles";
import { AddItemButton } from "./AddNewItem";
import { useAppState } from "../state/AppStateContext";
import { Card } from "./Card";
import { moveList, addTask, moveTask, setDraggedItem } from "../state/actions";
import { useRef } from "react";
import { useitemDrag } from "../utils/useItemDrag";
import { useDrop } from "react-dnd";
import { isHidden } from "../utils/isHidden";
import { DragItem } from "./DragItem";

type ColumnProps = {
  id: string;
  text: string;
  isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (!draggedItem) {
        return;
      }

      if (item.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId !== undefined) {
          if (draggedItem.columnId === id) {
            return;
          }
          if (tasks.length) {
            return;
          }
          dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
          dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
        }
      }
    },
  });
  const { drag } = useitemDrag({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card id={task.id} columnId={id} text={task.text} key={task.id} />
      ))}
      <AddItemButton
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
