import { slackData } from "./slackData"

const data = await slackData()
export const count = data.total_members_count ?? 0
export const formatted = count.toLocaleString('en-US')
export const thousands = Math.round(count / 1000)
