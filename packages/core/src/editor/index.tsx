'use client';

import { Editor as TiptapEditor, Extension } from '@tiptap/core';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';

import { EditorBubbleMenu } from './components/editor-bubble-menu';
import { EditorMenuBar } from './components/editor-menu-bar';
import { LogoBubbleMenu } from './components/logo-bubble-menu';
import { SpacerBubbleMenu } from './components/spacer-bubble-menu';
import { extensions as defaultExtensions } from './extensions';
import { cn } from './utils/classname';

export type EditorProps = {
  contentHtml?: string;
  contentJson?: JSONContent[];
  onUpdate?: (editor?: TiptapEditor) => void;
  onCreate?: (editor?: TiptapEditor) => void;
  extensions?: Extension[];
  config?: {
    hasMenuBar?: boolean;
    spellCheck?: boolean;
    wrapClassName?: string;
    toolbarClassName?: string;
    contentClassName?: string;
    bodyClassName?: string;
  };
};

export function Editor(props: EditorProps) {
  const {
    config: {
      wrapClassName = '',
      contentClassName = '',
      bodyClassName = '',
      hasMenuBar = true,
      spellCheck = false,
    } = {},
    onCreate,
    onUpdate,
    extensions,
    contentHtml,
    contentJson,
  } = props;

  let formattedContent: any = null;
  if (contentJson) {
    formattedContent = {
      type: 'doc',
      content: contentJson,
    };
  } else if (contentHtml) {
    formattedContent = contentHtml;
  } else {
    formattedContent = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '',
            },
          ],
        },
      ],
    };
  }

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn(`mly-prose mly-w-full`, contentClassName),
        spellCheck: spellCheck ? 'true' : 'false',
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          // prevent default event listeners from firing when slash command is active
          if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
            const slashCommand = document.querySelector('#slash-command');
            if (slashCommand) {
              return true;
            }
          }
        },
      },
    },
    onCreate: ({ editor }) => {
      onCreate?.(editor);
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor);
    },
    extensions: [...defaultExtensions, ...(extensions || [])],
    content: formattedContent,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cn('mail-editor mly-antialiased', wrapClassName)}>
      {hasMenuBar && <EditorMenuBar config={props.config} editor={editor} />}
      <div
        className={cn(
          'mly-mt-4 mly-rounded mly-border mly-bg-white mly-p-4',
          bodyClassName
        )}
      >
        <EditorBubbleMenu editor={editor} />
        <LogoBubbleMenu editor={editor} />
        <SpacerBubbleMenu editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
