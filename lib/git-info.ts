export const getGitSha = (): string => {
  return process.env.NEXT_PUBLIC_GIT_SHA || 'dev'
}

export const getGitShaShort = (): string => {
  const sha = getGitSha()
  return sha === 'dev' ? 'dev' : sha.substring(0, 7)
}
