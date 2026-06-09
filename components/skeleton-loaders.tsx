'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-3">
        <div className="h-10 bg-gray-200 rounded-lg w-64 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded-lg w-48 animate-pulse" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, idx) => (
          <Card key={idx} className="border border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <Card className="border border-border">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                </div>
                <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PatientTableSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded-lg w-56 animate-pulse" />
      </div>

      {/* Search Bar */}
      <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse" />

      {/* Table */}
      <Card className="border border-border">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Table Header */}
            <div className="flex gap-4 p-4 pb-6 border-b border-border">
              {Array(6).fill(0).map((_, idx) => (
                <div key={idx} className="h-4 bg-gray-200 rounded w-24 animate-pulse flex-1" />
              ))}
            </div>

            {/* Table Rows */}
            {Array(4).fill(0).map((_, idx) => (
              <div key={idx} className="flex gap-4 p-4 border-b border-border">
                {Array(6).fill(0).map((_, colIdx) => (
                  <div
                    key={colIdx}
                    className="h-5 bg-gray-200 rounded w-24 animate-pulse flex-1"
                  />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AgendaSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded-lg w-56 animate-pulse" />
      </div>

      {/* Date Selector */}
      <div className="h-16 bg-gray-200 rounded-lg w-full animate-pulse" />

      {/* Schedule */}
      <Card className="border border-border">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array(8).fill(0).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3).fill(0).map((_, idx) => (
          <Card key={idx} className="border border-border">
            <CardContent className="pt-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
