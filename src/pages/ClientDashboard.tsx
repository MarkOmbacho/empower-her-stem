
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, Clock, XCircle } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700"
};

const ClientDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("dashboardToken");
    api.get("/api/reports", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setReports(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredReports = reports.filter((r: any) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center">Loading reports...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pb-16">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Client Reports Dashboard</h1>
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="outline-none bg-transparent w-48"
            />
          </div>
          <div className="flex gap-6">
            <div className="bg-white rounded-lg px-4 py-2 shadow text-center">
              <div className="text-xs text-gray-500">Total Reports</div>
              <div className="text-xl font-bold text-blue-700">{reports.length}</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow text-center">
              <div className="text-xs text-gray-500">Pending</div>
              <div className="text-xl font-bold text-yellow-700">{reports.filter((r: any) => r.status === "pending").length}</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow text-center">
              <div className="text-xs text-gray-500">Resolved</div>
              <div className="text-xl font-bold text-green-700">{reports.filter((r: any) => r.status === "resolved").length}</div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {filteredReports.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No reports found.</div>
          ) : (
            filteredReports.map((report: any) => (
              <div key={report._id} className="bg-white rounded-xl shadow p-6 border-l-4" style={{ borderColor: report.status === "resolved" ? "#22c55e" : report.status === "rejected" ? "#ef4444" : "#eab308" }}>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-purple-700">{report.title}</h2>
                  {report.status === "resolved" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {report.status === "pending" && <Clock className="h-5 w-5 text-yellow-500" />}
                  {report.status === "rejected" && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
                <div className="mb-2 text-gray-700 font-medium">{report.description}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${statusColors[report.status]}`}>{report.status.toUpperCase()}</div>
                <div className="mb-2 text-xs text-gray-400">Date: {new Date(report.date).toLocaleString()}</div>
                <Button variant="outline">View Details</Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
