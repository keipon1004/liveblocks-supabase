'use client'

import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {TRANSFORMERS} from '@lexical/markdown';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {CodeNode, CodeHighlightNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {ListNode, ListItemNode} from "@lexical/list";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import React from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import * as Y from "yjs";
import {
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    LexicalEditor,
} from "lexical";
import {useRoom, useSelf} from "@/liveblocks.config";
import {CollaborationPlugin} from "@lexical/react/LexicalCollaborationPlugin";
import {Provider} from "@lexical/yjs";

function initialEditorState(editor: LexicalEditor): void {
    const root = $getRoot();
    const paragraph = $createParagraphNode();
    const text = $createTextNode();
    paragraph.append(text);
    root.append(paragraph);
}

export const Editor: React.FC = () => {
    const room = useRoom();
    const userInfo = useSelf((me) => me.info);

    // Lexical config
    const initialConfig = {
        namespace: "LiveblocksDemo",
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            AutoLinkNode,
            LinkNode,
        ],
        theme: {},
        onError: (error: unknown) => {
            throw error
        },
    };

    return <div className={'p-8'}>
        <div className={"w-[1000px] text-lg p-8 leading-loose bg-slate-900 text-white rounded-xl border-2"}>
            <LexicalComposer initialConfig={initialConfig}>
                <RichTextPlugin
                    contentEditable={<ContentEditable/>}
                    placeholder={
                        <div>未入力</div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
                <CollaborationPlugin
                    id="yjs-plugin"
                    providerFactory={(id, yDocMap) => {
                        const yDoc = new Y.Doc();
                        yDocMap.set(id, yDoc);
                        return new LiveblocksProvider(room, yDoc) as Provider;
                    }}
                    initialEditorState={initialEditorState}
                    shouldBootstrap={true}
                    cursorColor={userInfo?.color}
                    username={userInfo?.name}
                />
            </LexicalComposer>
        </div>
    </div>
}