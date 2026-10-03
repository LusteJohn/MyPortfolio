const USERNAME = 'LusteJohn'
const WEEKS = 53
const RANGE_START = () => new Date(Date.now() - WEEKS * 7 * 86400000).toISOString().slice(0, 10)

function authHeaders(token) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  }
}

async function github(path, token) {
  const res = await fetch(`https://api.github.com${path}`, { headers: authHeaders(token) })
  if (!res.ok) throw new Error(`GitHub ${path} responded ${res.status}`)
  return res.json()
}

async function fetchPrivateRepos(token) {
  try {
    const repos = await github(
      `/user/repos?visibility=private&affiliation=owner&sort=pushed&per_page=12`,
      token
    )
    return repos
      .filter((r) => !r.fork)
      .map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language || null,
        color: null,
        pushedAt: r.pushed_at,
        lastCommit: null,
        lastCommitAt: r.pushed_at
      }))
  } catch {
    return []
  }
}

async function fetchPrivateCommits(names, token) {
  const since = `${RANGE_START()}T00:00:00Z`
  const results = await Promise.all(
    names.map(async (name) => {
      const counts = new Map()
      let message = null
      try {
        const commits = await github(
          `/repos/${USERNAME}/${name}/commits?since=${since}&per_page=100`,
          token
        )
        for (const c of commits) {
          const day = (c.commit?.author?.date || '').slice(0, 10)
          if (day) counts.set(day, (counts.get(day) || 0) + 1)
        }
        message = commits[0]?.commit?.message?.split('\n')[0] || null
      } catch {
        /* one repo failing should not break the response */
      }
      return { name, counts, message }
    })
  )

  const perRepo = new Map()
  const byDay = new Map()
  const messages = new Map()
  for (const { name, counts, message } of results) {
    let sum = 0
    for (const [date, count] of counts) {
      byDay.set(date, (byDay.get(date) || 0) + count)
      sum += count
    }
    perRepo.set(name, sum)
    if (message) messages.set(name, message)
  }
  return { perRepo, byDay, messages }
}

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN

  const respond = (code, payload) => {
    if (typeof res.status === 'function') {
      res.status(code).json(payload)
      return
    }
    res.statusCode = code
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payload))
  }

  if (!token) {
    respond(500, { error: 'GitHub token is not configured on the server' })
    return
  }

  try {
    const calendarRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        query: `query ($login: String!, $from: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from) {
              contributionCalendar {
                totalContributions
                weeks { contributionDays { date contributionCount } }
              }
              commitContributionsByRepository(maxRepositories: 10) {
                repository { name }
                contributions { totalCount }
              }
            }
          }
        }`,
        variables: { login: USERNAME, from: `${RANGE_START()}T00:00:00Z` }
      })
    })

    if (!calendarRes.ok) throw new Error(`GraphQL responded ${calendarRes.status}`)
    const body = await calendarRes.json()
    if (body.errors?.length) throw new Error(body.errors[0].message)

    const collection = body.data?.user?.contributionsCollection
    if (!collection) throw new Error('No contribution data returned')

    const days = collection.contributionCalendar.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
    )

    const privateRepos = await fetchPrivateRepos(token)
    for (const repo of privateRepos) repo.lastCommit = null
    const { perRepo, byDay, messages } = await fetchPrivateCommits(
      privateRepos.map((r) => r.name),
      token
    )
    for (const repo of privateRepos) {
      if (messages.has(repo.name)) repo.lastCommit = messages.get(repo.name)
    }

    const merged = new Map(days.map((d) => [d.date, d.count]))
    for (const [date, count] of byDay) merged.set(date, (merged.get(date) || 0) + count)

    const topRepos = [
      ...collection.commitContributionsByRepository.map((r) => ({
        name: r.repository.name,
        count: r.contributions.totalCount
      })),
      ...privateRepos.map((r) => ({ name: r.name, count: perRepo.get(r.name) || 0 }))
    ]
      .filter((r) => r.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    if (typeof res.setHeader === 'function') {
      res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600')
    }
    respond(200, {
      days: [...merged].map(([date, count]) => ({ date, count })),
      totalContributions: [...merged.values()].reduce((a, b) => a + b, 0),
      activeDays: [...merged.values()].filter((c) => c > 0).length,
      topRepos,
      privateRepos
    })
  } catch (err) {
    respond(502, { error: err.message })
  }
}