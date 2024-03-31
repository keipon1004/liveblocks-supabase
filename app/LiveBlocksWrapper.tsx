'use client'

import {RoomProvider} from "@/liveblocks.config";
import {ClientSideSuspense} from "@liveblocks/react";
import React from "react";

export const LiveBlocksWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    // @ts-ignore
        <RoomProvider id="my-room" initialPresence={{}}>
            <ClientSideSuspense fallback="Loading…">
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    );
}