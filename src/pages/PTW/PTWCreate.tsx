import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader } from 'lucide-react'
import { usePTWStore } from '@stores/ptwStore'
import { PTWType } from '@types/index'

const PTW_TYPES: PTWType[] = [
  'electrical',
  'hot_work',
  'cold_work',
  'confined_space',
  'excavation',
  'lifting',
  'working_at_height',
]

export default function PTWCreate() {
  const navigate = useNavigate()
  const { createPTW, isLoading } = usePTWStore()
  const [formData, setFormData] = useState({
    type: 'electrical' as PTWType,
    department: '',
    location: '',
    area: '',
    equipment: '',
    description: '',
    startDate: '',
    endDate: '',
    responsibleEngineer: '',
    supervisor: '',
    priority: 'high' as const,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPTW({
        ...formData,
        permitNumber: `PTW-${Date.now()}`,
        status: 'draft',
        hazards: [],
        isolation: { lotoRequired: false },
        signatures: [],
        attachments: [],
      })
      navigate('/ptw')
    } catch (error) {
      console.error('Error creating PTW:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
        >
          <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New PTW</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Fill in the details to create a new Permit to Work</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">PTW Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input"
                required
              >
                {PTW_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Operations"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input"
                placeholder="e.g., Field A"
                required
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Work Details</h2>
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input"
                rows={4}
                placeholder="Describe the work to be performed"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Responsibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Responsible Engineer</label>
              <input
                type="text"
                name="responsibleEngineer"
                value={formData.responsibleEngineer}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Supervisor</label>
              <input
                type="text"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isLoading} className="btn-primary flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Creating...
              </>
            ) : (
              'Create PTW'
            )}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}