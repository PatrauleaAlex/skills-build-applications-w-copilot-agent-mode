import { useEffect, useState } from 'react'
import {
  getCollectionApiUrl,
  getErrorMessage,
  normalizeCollectionResponse,
} from '../config/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const loadActivities = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getCollectionApiUrl('activities'))

        if (!response.ok) {
          throw new Error(`Unable to load activities: ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setActivities(normalizeCollectionResponse(payload))
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(getErrorMessage(fetchError, 'Unable to load activities.'))
          setActivities([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="resource-header">
        <div>
          <p className="resource-kicker">API collection</p>
          <h2>Activities</h2>
        </div>
        <code>{getCollectionApiUrl('activities')}</code>
      </div>

      {loading ? <p className="status-text">Loading activities...</p> : null}
      {error ? <p className="alert alert-danger mb-0">{error}</p> : null}

      {!loading && !error ? (
        activities.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">User</th>
                  <th scope="col">Type</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id ?? activity._id ?? `${activity.name ?? 'activity'}-${index}`}>
                    <td>{activity.name ?? activity.title ?? 'Unnamed activity'}</td>
                    <td>{activity.userName ?? activity.user?.name ?? activity.user ?? 'Unknown user'}</td>
                    <td>{activity.type ?? activity.category ?? 'Not set'}</td>
                    <td>{activity.duration ?? activity.durationMinutes ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="status-text">No activities available.</p>
        )
      ) : null}
    </section>
  )
}

export default Activities
