import type { Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { Toggle } from "./ui/toggle";

export default function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-3 border p-2 rounded-md mb-3">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-5 h-5" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-5 h-5" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="w-5 h-5" />
      </Toggle>
    </div>
  );
}
