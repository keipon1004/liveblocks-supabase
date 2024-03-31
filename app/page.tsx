import {LiveBlocksWrapper} from "@/app/LiveBlocksWrapper";
import {CursorSyncWrapper} from "@/app/CursorSyncWrapper";
import {Editor} from "@/app/Editor";
import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";
export default async function Home() {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  console.log(supabase)

  return (
    <main>
      <LiveBlocksWrapper>
        <CursorSyncWrapper>
          <Editor/>
        </CursorSyncWrapper>
      </LiveBlocksWrapper>
    </main>
  )
}
