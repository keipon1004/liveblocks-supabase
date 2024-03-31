import {Liveblocks} from "@liveblocks/node";
import {NextRequest, NextResponse} from "next/server";
import {nanoid} from "nanoid";
import {UserMeta} from "@/liveblocks.config";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_API_KEY!,
});

export async function POST(request: NextRequest) {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return redirect("/login");
    }

    const email = user.email;
    const atIndex = email.indexOf('@');
    const trimmedEmail = email.slice(0, atIndex);

    const userInfo: UserMeta["info"] = {
        name: trimmedEmail!,
        color: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
        picture: 'https://avatars.githubusercontent.com/u/6592938?v=4',
    }

    const liveSession = liveblocks.prepareSession(nanoid(), {userInfo});

    const {room} = await request.json();
    liveSession.allow(room, liveSession.FULL_ACCESS);

    // Authorize the user and return the result
    const {body, status} = await liveSession.authorize();
    return new NextResponse(body, {status});
}