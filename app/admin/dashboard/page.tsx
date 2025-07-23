import AuthCheck from "@/components/admin/auth-check"
import AdminLayout from "@/components/admin/admin-layout"
import DashboardOverview from "@/components/admin/dashboard-overview"

export default function AdminDashboard() {
  return (
    <AuthCheck>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to the WanderLux admin panel</p>
          </div>
          <DashboardOverview />
        </div>
      </AdminLayout>
    </AuthCheck>
  )
}
