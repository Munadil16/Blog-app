import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";

interface TiptapProps {
  content: string;
  setContent: (content: string) => void;
}

const Tiptap = ({ content, setContent }: TiptapProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    content: content,
    extensions: [StarterKit],
    onUpdate: () => {
      const html = editor?.getHTML();
      setContent(html ?? "");
    },
    editorProps: {
      attributes: {
        class: "border rounded-lg min-h-[200px] p-2 mb-3",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
