export type ColumnDragItem = {
  id: string;
  text: string;
  type: "COLUMN";
  columnId?: string;
};

export type CardDragItem = {
  id: string;
  columnId: string;
  text: string;
  type: "CARD";
};

export type DragItem = ColumnDragItem | CardDragItem;
