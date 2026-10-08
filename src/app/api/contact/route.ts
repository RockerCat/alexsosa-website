import { site } from "@/content/site"
import { createContactHandler } from "@/lib/contact/handler"
import { senderFromEnv } from "@/lib/contact/send"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const handle = createContactHandler({
  getSender: () => senderFromEnv(process.env, site.email),
})

export async function POST(request: Request) {
  return handle(request)
}
