import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PTWDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="card">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">PTW Detail: {id}</h1>
        <p className="text-gray-600 dark:text-gray-400">PTW detail view coming soon</p>
      </div>
    </div>
  )
}