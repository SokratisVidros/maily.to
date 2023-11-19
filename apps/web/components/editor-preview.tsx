'use client';

import { Editor } from '@maily-to/core';
import { useState } from 'react';
import { Editor as TiptapEditor } from '@tiptap/core';
import { Input } from './ui/input';

export function EditorPreview() {
  const [editor, setEditor] = useState<TiptapEditor>();

  const defaultHtml = `<img src="/brand/icon.svg" data-maily-component="logo" data-size="md" data-alignment="left" style="position:relative;margin-top:0;height:48px;margin-right:auto;margin-left:0"><div data-maily-component="spacer" data-height="xl" style="width: 100%; height: 64px;" class="spacer" contenteditable="false"></div><h2><strong>Discover Maily</strong></h2><p>Are you ready to transform your email communication? Introducing Maily, the powerful email editor that enables you to craft captivating emails effortlessly.</p><p>Elevate your email communication with Maily! Click below to try it out:</p><a data-maily-component="button" mailycomponent="button" text="Try Maily Now →" url="" alignment="left" variant="filled" borderradius="round" buttoncolor="#141313" textcolor="#ffffff"></a><div data-maily-component="spacer" data-height="xl" style="width: 100%; height: 64px;" class="spacer" contenteditable="false"></div><p>Join our vibrant community of users and developers on GitHub, where Maily is an <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/arikchakma/maily.to"><em>open-source</em></a> project. Together, we'll shape the future of email editing.</p><p>Regards,<br>Arikko</p>`;

  return (
    <div className="mt-3">
      <div className="mb-6">
        <Input type="text" placeholder="Preview Text" className="border-x-0 border-gray-300 focus-visible:border-gray-400 rounded-none text-base h-auto px-0 focus-visible:ring-offset-0 focus-visible:ring-0" />
      </div>
      <Editor
        config={{
          hasMenuBar: false,
          wrapClassName: 'editor-wrap',
          bodyClassName: '!mt-0 !border-0 !p-0',
          contentClassName: 'editor-content',
          toolbarClassName: 'flex-wrap !items-start',
          spellCheck: false,
        }}
        contentHtml={defaultHtml}
        onCreate={setEditor}
        onUpdate={setEditor}
      />
    </div>
  );
}
