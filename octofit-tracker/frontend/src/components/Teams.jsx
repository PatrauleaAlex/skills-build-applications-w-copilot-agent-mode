import { useEffect, useState } from 'react'
import {
  getCollectionApiUrl,
  getErrorMessage,
  normalizeCollectionResponse,
} from '../config/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const loadTeams = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getCollectionApiUrl('teams'))

        if (!response.ok) {
          throw new Error(`Unable to load teams: ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setTeams(normalizeCollectionResponse(payload))
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(getErrorMessage(fetchError, 'Unable to load teams.'))
          setTeams([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadTeams()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="resource-header">
        <div>
          <p className="resource-kicker">API collection</p>
          <h2>Teams</h2>
        </div>
        <code>{getCollectionApiUrl('teams')}</code>
      </div>

      {loading ? <p className="status-text">Loading teams...</p> : null}
      {error ? <p className="alert alert-danger mb-0">{error}</p> : null}

      {!loading && !error ? (
        teams.length > 0 ? (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div className="col-md-6 col-xl-4" key={team.id ?? team._id ?? `${team.name ?? 'team'}-${index}`}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 card-title">{team.name ?? 'Unnamed team'}</h3>
                    <p className="card-text mb-2">
                      <strong>Members:</strong> {team.memberCount ?? team.members?.length ?? 0}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Description:</strong> {team.description ?? 'No description provided.'}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <p className="status-text">No teams available.</p>
        )
      ) : null}
    </section>
  )
}

export default Teams
