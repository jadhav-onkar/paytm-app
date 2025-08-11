import { Appbar } from "@repo/ui/appbar";
import { PrismaClient } from "@repo/db/db"

const client = new PrismaClient()
export default function Home() {
  console.log("hi there")
  console.log(client.user)
  console.log("hi there")

  return (
    <div>
      <Appbar />
    </div>
  );
}
