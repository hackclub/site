/**
 * useSWR() fetcher
 * @param  {...any} args fetcher for useSWR()
 */

export default async function fetcher(...args) {
  const res = await fetch(...args)
  return await res.json()
}
