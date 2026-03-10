// this could use the slackData lib, but apparently top level awaits are risky
export const count: number = 103897
export const formatted = count.toLocaleString('en-US')
export const thousands = Math.round(count / 1000)
