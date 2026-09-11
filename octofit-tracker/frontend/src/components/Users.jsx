import { useEffect, useState } from 'react'
import {
  getCollectionApiUrl,
  getErrorMessage,
  normalizeCollectionResponse,
} from '../config/api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const loadUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getCollectionApiUrl('users'))

        if (!response.ok) {
          throw new Error(`Unable to load users: ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setUsers(normalizeCollectionResponse(payload))
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(getErrorMessage(fetchError, 'Unable to load users.'))
          setUsers([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="resource-header">
        <div>
          <p className="resource-kicker">API collection</p>
          <h2>Users</h2>
        </div>
        <code>{getCollectionApiUrl('users')}</code>
      </div>

      {loading ? <p className="status-text">Loading users...</p> : null}
      {error ? <p className="alert alert-danger mb-0">{error}</p> : null}

      {!loading && !error ? (
        users.length > 0 ? (
          <div className="row g-3">
            {users.map((user, index) => (
              <div className="col-md-6 col-xl-4" key={user.id ?? user._id ?? `${user.email ?? 'user'}-${index}`}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="h5 card-title">{user.name ?? user.username ?? 'Unknown user'}</h3>
                    <p className="card-text mb-2">
                      <strong>Email:</strong> {user.email ?? 'Not available'}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Goal:</strong> {user.goal ?? user.fitnessGoal ?? 'No goal set'}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        ) : (
          <p className="status-text">No users available.</p>
        )
      ) : null}
    </section>
  )
}

export default Users
