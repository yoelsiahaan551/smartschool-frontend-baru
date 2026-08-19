'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useState, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = 'Tulis konten di sini...' }) => {
  const [content, setContent] = useState(value || '');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: true }),
      Link.configure({ openOnClick: false }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none border rounded-md p-4 min-h-[200px] focus:outline-none bg-white',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== content) {
      editor.commands.setContent(value || '');
      setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return <div className="p-4">Loading editor...</div>;

  const Toolbar = () => (
    <div className="flex flex-wrap gap-1 mb-2 border-b pb-2">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Bold</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Italic</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>H3</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Bullet</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Number</button>
      <button type="button" onClick={() => { const url = window.prompt('URL link:'); if (url) editor.chain().focus().setLink({ href: url }).run(); }} className="px-2 py-1 rounded bg-gray-200">Link</button>
      <button type="button" onClick={() => { const url = window.prompt('URL gambar:'); if (url) editor.chain().focus().setImage({ src: url }).run(); }} className="px-2 py-1 rounded bg-gray-200">Image</button>
    </div>
  );

  return (
    <div className="border rounded-md p-2 bg-gray-50">
      <Toolbar />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;