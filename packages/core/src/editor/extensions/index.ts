import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import Dropcursor from '@tiptap/extension-dropcursor';
import Heading from '@tiptap/extension-heading';
import TiptapLink from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';

import { HorizontalRule } from './horizontal-rule';
import { ButtonExtension } from './button-extension';
import { Footer } from '../nodes/footer';
import { TiptapLogoExtension } from '../nodes/logo';
import { Spacer } from '../nodes/spacer';
import { Variable } from '../nodes/variable';
import { SlashCommand } from './slash-command';
import Underline from '@tiptap/extension-underline';

export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Dropcursor.configure({
    color: '#555',
    width: 3,
  }),
  Underline,
  TiptapLogoExtension,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  TextAlign.configure({ types: [Paragraph.name, Heading.name, Footer.name] }),
  HorizontalRule,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`;
      }

      return 'Write something or / to see commands';
    },
    includeChildren: true,
  }),
  Spacer,
  Footer,
  Variable,
  SlashCommand,
  TiptapLink.configure({
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
    },
    openOnClick: false,
  }),
  ButtonExtension,
];
