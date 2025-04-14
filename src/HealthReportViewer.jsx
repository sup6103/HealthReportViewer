import React, { useImperativeHandle, useState } from "react";
import axios from "axios";
import { getToken } from "./auth";

const HealthReportViewer = () => {
      const [user, setUser] = useState(null);

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const userInfoResponse = await axios
            .get("http://localhost:8443/api/v1/userInfo/", {withCredentials : true});
                
            const userInfo = userInfoResponse.data;
            setUser(userInfo);

            if (!userInfo.email) {
                throw new Error("Email not found in user info");
            }

            const response = await axios.post(
              "http://localhost:8443/api/v1/getReportById",
              { patientId: userInfo.email },{withCredentials : true},
           
            );
            setReport(response.data);
          } catch (err) {
            setError("Failed to fetch report. Please try again.");
          } finally {
            setLoading(false);
          }
        };
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
              <h1 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Patient Health Report</h1>
              <button
                onClick={fetchReport}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
              >
                {loading ? "Loading..." : "Fetch Report"}
              </button>
              {error && <p className="text-red-500">{error}</p>}
              {report && (
                <div className="w-full max-w-3xl bg-white shadow rounded-lg p-4">
                  {report.results.map((testGroup, idx) => (
  <div key={idx} className="w-full max-w-3xl my-6 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-blue-100 px-4 py-2">
      <h2 className="text-lg font-semibold text-blue-800">{testGroup.test_name}</h2>
    </div>
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b">Test</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b">Value</th>
            <th className="px-4 py-2 text-sm font-medium text-gray-700 border-b">Reference Range</th>
          </tr>
        </thead>
        <tbody>
          {testGroup.result.map((item, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-all">
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{item.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800 border-b">{item.value}</td>
              <td className="px-4 py-2 text-sm text-gray-600 border-b">{item.reference_interval}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
))}
                </div>
              )}
            </div>
          );
        };
export default HealthReportViewer;