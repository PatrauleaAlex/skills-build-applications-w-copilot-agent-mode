import { useEffect, useState } from 'react'
import {
  getCollectionApiUrl,
  getErrorMessage,
  normalizeCollectionResponse,
} from '../config/api.js'

const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : getCollectionApiUrl('leaderboard')

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const loadLeaderboard = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(leaderboardApiUrl)

        if (!response.ok) {
          throw new Error(`Unable to load leaderboard: ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setEntries(normalizeCollectionResponse(payload))
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(getErrorMessage(fetchError, 'Unable to load leaderboard.'))
          setEntries([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="resource-header">
        <div>
          <p className="resource-kicker">API collection</p>
          <h2>Leaderboard</h2>
        </div>
        <code>{leaderboardApiUrl}</code>
      </div>

      {loading ? <p className="status-text">Loading leaderboard...</p> : null}
      {error ? <p className="alert alert-danger mb-0">{error}</p> : null}

      {!loading && !error ? (
        entries.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Competitor</th>
                  <th scope="col">Team</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id ?? entry._id ?? `${entry.userName ?? 'leader'}-${index}`}>
                    <td>{entry.rank ?? index + 1}</td>
                    <td>{entry.userName ?? entry.name ?? entry.user?.name ?? 'Unknown competitor'}</td>
                    <td>{entry.teamName ?? entry.team?.name ?? entry.team ?? 'No team'}</td>
                    <td>{entry.score ?? entry.points ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="status-text">No leaderboard entries available.</p>
        )
      ) : null}
    </section>
  )
}

export default Leaderboard
