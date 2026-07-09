import React, { useEffect, useState } from 'react'
import { AlertCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import { SafetyKPI } from '@types/index'

export default function Dashboard() {
  const [kpis, setKpis] = useState<SafetyKPI | null>(null)

  useEffect(() => {
    // Fetch dashboard data
    const mockData: SafetyKPI = {
      safeDays: 45,
      totalPTW: 156,
      openPTW: 12,
      closedPTW: 144,
      highRiskJobs: 3,
      nearMissReports: 8,
      incidents: 2,
      inspections: 28,
      correctiveActions: 15,
      toolboxTalks: 12,
      trainingCompliance: 95,
      trir: 0.5,
      ltif: 0.2,
      nearMissFrequency: 0.08,
    }
    setKpis(mockData)
  }, [])

  const metrics = [
    { label: 'Safe Days', value: kpis?.safeDays, icon: CheckCircle, color: 'text-success' },
    { label: 'Open PTW', value: kpis?.openPTW, icon: Clock, color: 'text-warning' },
    { label: 'High Risk Jobs', value: kpis?.highRiskJobs, icon: AlertCircle, color: 'text-danger' },
    { label: 'Training Compliance', value: `${kpis?.trainingCompliance}%`, icon: TrendingUp, color: 'text-info' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's your HSE overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {metric.value}
                  </p>
                </div>
                <Icon className={`${metric.color} w-8 h-8`} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Metrics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">TRIR (Total Recordable Incident Rate)</span>
              <span className="font-bold text-gray-900 dark:text-white">{kpis?.trir}</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">LTIF (Lost Time Injury Frequency)</span>
              <span className="font-bold text-gray-900 dark:text-white">{kpis?.ltif}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Near Miss Frequency</span>
              <span className="font-bold text-gray-900 dark:text-white">{kpis?.nearMissFrequency}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/ptw/new" className="block btn-primary text-center">
              Create New PTW
            </a>
            <a href="/incidents" className="block btn-secondary text-center">
              Report Incident
            </a>
            <a href="/near-miss" className="block btn-secondary text-center">
              Report Near Miss
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}