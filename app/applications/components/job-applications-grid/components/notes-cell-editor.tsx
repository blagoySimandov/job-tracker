"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ICellEditorParams } from "ag-grid-community";

export const NotesCellEditor = forwardRef((props: ICellEditorParams, ref) => {
  const [value, setValue] = useState(props.value || "");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    isCancelAfterEnd: () => false,
  }));

  return (
    <textarea
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="h-full w-full resize-none border-2 border-blue-500 p-2 text-sm outline-none"
      rows={1}
    />
  );
});

NotesCellEditor.displayName = "NotesCellEditor";
