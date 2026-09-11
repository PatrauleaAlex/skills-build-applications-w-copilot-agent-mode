import { useEffect, useState } from 'react'
import {
  getCollectionApiUrl,
  getErrorMessage,
  normalizeCollectionResponse,
} from '../config/api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    const loadWorkouts = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(getCollectionApiUrl('workouts'))

        if (!response.ok) {
          throw new Error(`Unable to load workouts: ${response.status}`)
        }

        const payload = await response.json()

        if (!ignore) {
          setWorkouts(normalizeCollectionResponse(payload))
        }
      } catch (fetchError) {
        if (!ignore) {
          setError(getErrorMessage(fetchError, 'Unable to load workouts.'))
          setWorkouts([])
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="resource-header">
        <div>
          <p className="resource-kicker">API collection</p>
          <h2>Workouts</h2>
        </div>
        <code>{getCollectionApiUrl('workouts')}</code>
      </div>

      {loading ? <p className="status-text">Loading workouts...</p> : null}
      {error ? <p className="alert alert-danger mb-0">{error}</p> : null}

      {!loading && !error ? (
        workouts.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Workout</th>
                  <th scope="col">Focus</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={workout.id ?? workout._id ?? `${workout.name ?? 'workout'}-${index}`}>
                    <td>{workout.name ?? workout.title ?? 'Unnamed workout'}</td>
                    <td>{workout.focus ?? workout.category ?? 'General fitness'}</td>
                    <td>{workout.difficulty ?? 'Not set'}</td>
                    <td>{workout.duration ?? workout.durationMinutes ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="status-text">No workouts available.</p>
        )
      ) : null}
    </section>
  )
}

export default Workouts
