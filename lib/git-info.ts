export const getGitSha = (): string => {
  return process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev'
}

export const getGitShaShort = (): string => {
  const sha = getGitSha()
  return sha === 'dev' ? 'dev' : sha.substring(0, 7)
}
