// Alias for messaging - redirects to dashboard messages tab
import { redirect } from "next/navigation"

export default function MessagesPage() {
  redirect("/dashboard?tab=messages")
}
