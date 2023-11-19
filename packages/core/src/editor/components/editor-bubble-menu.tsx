import { FC } from 'react';
import { BubbleMenu, BubbleMenuProps, isTextSelection } from '@tiptap/react';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  LucideIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';

import { BubbleMenuButton } from './bubble-menu-button';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon?: LucideIcon;
}

export type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => props?.editor?.isActive('bold')!,
      command: () => props?.editor?.chain().focus().toggleBold().run()!,
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => props?.editor?.isActive('italic')!,
      command: () => props?.editor?.chain().focus().toggleItalic().run()!,
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => props?.editor?.isActive('underline')!,
      command: () => props?.editor?.chain().focus().toggleUnderline().run()!,
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => props?.editor?.isActive('strike')!,
      command: () => props?.editor?.chain().focus().toggleStrike().run()!,
      icon: StrikethroughIcon,
    },
    {
      name: 'left',
      isActive: () => props?.editor?.isActive({ textAlign: 'left' })!,
      command: () => {
        if (props?.editor?.isActive({ textAlign: 'left' })) {
          props?.editor?.chain()?.focus().unsetTextAlign().run();
        } else {
          props?.editor?.chain().focus().setTextAlign('left').run()!;
        }
      },
      icon: AlignLeftIcon,
    },
    {
      name: 'center',
      isActive: () => props?.editor?.isActive({ textAlign: 'center' })!,
      command: () => {
        if (props?.editor?.isActive({ textAlign: 'center' })) {
          props?.editor?.chain().focus().unsetTextAlign().run()!;
        } else {
          props?.editor?.chain().focus().setTextAlign('center').run()!;
        }
      },
      icon: AlignCenterIcon,
    },
    {
      name: 'right',
      isActive: () => props?.editor?.isActive({ textAlign: 'right' })!,
      command: () => {
        if (props?.editor?.isActive({ textAlign: 'right' })) {
          props?.editor?.chain().focus().unsetTextAlign().run()!;
        } else {
          props?.editor?.chain().focus().setTextAlign('right').run()!;
        }
      },
      icon: AlignRightIcon,
    },
    {
      name: 'link',
      command: () => {
        const previousUrl = props?.editor?.getAttributes('link').href!;
        const url = window.prompt('URL', previousUrl);

        // If the user cancels the prompt, we don't want to toggle the link
        if (url === null) {
          return;
        }

        // If the user deletes the URL entirely, we'll unlink the selected text
        if (url === '') {
          props?.editor
            ?.chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run();

          return;
        }

        // Otherwise, we set the link to the given URL
        props?.editor
          ?.chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run()!;
      },
      isActive: () => props?.editor?.isActive('link')!,
      icon: LinkIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor, view, state, oldState, from, to }) => {
      const { doc, selection } = state;
      const { empty } = selection;

      // Sometime check for `empty` is not enough.
      // Doubleclick an empty paragraph returns a node size of 2.
      // So we check also for an empty text size.
      const isEmptyTextBlock =
        !doc.textBetween(from, to).length && isTextSelection(state.selection);

      if (
        empty ||
        isEmptyTextBlock ||
        !editor.isEditable ||
        editor.isActive('image') ||
        editor.isActive('logo') ||
        editor.isActive('spacer') ||
        editor.isActive({
          mailyComponent: 'button',
        })
      ) {
        return false;
      }

      return true;
    },
    tippyOptions: {
      moveTransition: 'mly-transform 0.15s mly-ease-out',
    },
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="mly-flex mly-gap-1 mly-rounded-md mly-border mly-border-slate-200 mly-bg-white mly-p-1 mly-shadow-md"
    >
      {items.map((item, index) => (
        <BubbleMenuButton key={index} {...item} />
      ))}
    </BubbleMenu>
  );
};
