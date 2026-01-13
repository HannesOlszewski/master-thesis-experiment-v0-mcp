export interface DashboardData {
  user_statistics: {
    total_users: number
    active_users: number
    new_users_today: number
    new_users_this_week: number
    new_users_this_month: number
    growth: {
      daily_growth_percent: number
      weekly_growth_percent: number
      monthly_growth_percent: number
    }
    average_session_duration_minutes: number
    retention_rate_percent: number
  }
  financial: {
    revenue: {
      total_revenue: number
      monthly_revenue: number
      daily_revenue: number
    }
    transactions: {
      total_transactions: number
      average_transaction_value: number
    }
    recent_transactions: Array<{
      transaction_id: string
      user_id: string
      amount: number
      timestamp: string
    }>
  }
  system_status: {
    cpu_usage_percent: number
    memory_usage_percent: number
    disk_usage_percent: number
  }
  time_series_data?: Array<{
    timestamp: string
    value: number
  }>
  geographic_data?: {
    users_by_country: Record<string, number>
  }
  activity_feed?: Array<{
    timestamp: string
    message: string
  }>
}

export interface DashboardEvent {
  event: string
  data: {
    metric?: string
    value?: number
    status?: string
    timestamp: string
  }
}
