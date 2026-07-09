import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { usePTWStore } from '@stores/ptwStore'

export default function PTWList() {
  const { ptws, fetchPTWs, isLoading } = usePTWStore()

  useEffect(() => {
    fetchPTWs()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Permits to Work</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and track all PTWs</p>
        </div>
        <Link to="/ptw/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          New PTW
        </Link>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-4 p-3 bg-gray-100 dark:bg-slate-700 rounded-lg">
          <Search size={20} className="text-gray-600 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search PTWs..."
            className="bg-transparent outline-none w-full text-gray-900 dark:text-white"
          />
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>PTW Number</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : ptws.length > 0 ? (
                ptws.map((ptw) => (
                  <tr key={ptw.id}>
                    <td>
                      <Link to={`/ptw/${ptw.id}`} className="text-primary-500 hover:text-primary-600 font-medium">
                        {ptw.permitNumber}
                      </Link>
                    </td>
                    <td className="capitalize">{ptw.type.replace(/_/g, ' ')}</td>
                    <td>{ptw.location}</td>
                    <td>
                      <span className={`badge badge-${ptw.status === 'approved' ? 'success' : ptw.status === 'rejected' ? 'danger' : 'warning'}`}>
                        {ptw.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${ptw.priority === 'critical' ? 'danger' : ptw.priority === 'high' ? 'warning' : 'primary'}`}>
                        {ptw.priority}
                      </span>
                    </td>
                    <td>
                      <Link to={`/ptw/${ptw.id}`} className="text-primary-500 hover:text-primary-600">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-600 dark:text-gray-400">
                    No PTWs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}