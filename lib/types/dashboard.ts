export interface DashboardData {
  metadata?: {
    generated_at: string
    data_freshness: string
    api_version: string
  }
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
      revenue_today: number
      revenue_this_week: number
      revenue_this_month: number
      average_transaction_value: number
      total_transactions: number
      currency: string
    }
    recent_transactions: Array<{
      id: string
      amount: number
      currency: string
      type: string
      timestamp: string
      user_id: string
      status: string
    }>
    pending_amount: number
    refund_rate_percent: number
  }
  system_health: {
    status: string
    cpu_usage: string
    memory_usage: string
    disk_usage?: string
  }
}

export interface DashboardEvent {
  event: string
  data: {
    metric?: string
    value?: number | string
    status?: string
    timestamp?: string
    transaction_id?: string
    amount?: number
    [key: string]: unknown
  }
}
