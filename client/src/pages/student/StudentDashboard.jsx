import React, { useEffect, useState } from "react";
import { api, useClerkToken } from "../../utils/api";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

export default function StudentDashboard() {
  const getToken = useClerkToken();
  const [data, setData] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoaded, user } = useUser();

  // Load student info
  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const res = await api.get("/api/student/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    })();
  }, []);

  // Poll active session every 5 seconds
  useEffect(() => {
    const poll = setInterval(async () => {
      const token = await getToken();
      const res = await api.get("/api/student/active-session", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSession(res.data.session);
    }, 5000);

    return () => clearInterval(poll);
  }, []);

  // Mark Attendance
 const handleMarkAttendance = async () => {
  if (!session || loading) return;

  setLoading(true);

  const token = await getToken();

  // Helper: Get a single GPS reading
  const getGPS = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
        {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 0,
        }
      );
    });

  try {
    // 1st reading
    const pos1 = await getGPS();

    // Wait 1 second to stabilize
    await new Promise((res) => setTimeout(res, 1000));

    //  2nd reading
    const pos2 = await getGPS();

    // average of two 
    const lat = (pos1.latitude + pos2.latitude) / 2;
    const lng = (pos1.longitude + pos2.longitude) / 2;

    
    const res = await api.post(
      "/api/attendance/mark",
      {
        sessionId: session.id,
        lat1: pos1.latitude,
        lng1: pos1.longitude,
        lat2: pos2.latitude,
        lng2: pos2.longitude,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Attendance Marked", {
      description: res.data.message,
    });
  } catch (err) {
    console.log("Attendance GPS error:", err);

    toast.error("Attendance not marked!", {
      description: err.response?.data?.error || "GPS accuracy too low",
    });
  } finally {
    setLoading(false);
  }
};


  if (!isLoaded) return <p>Loading user...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student</h1>

      {data ? (
        <>
          <div className="mb-8">
            <p>
              <strong>Name:</strong>{" "}
              {user.fullName || user.firstName || "Unknown"}
            </p>
            <p>
              <strong>Role:</strong> {data.role}
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Classes</h2>
<hr />
          {!data.class ? (
            <p className="text-gray-500">No class assigned.</p>
          ) : (
            <div className="border rounded-md shadow-sm p-6 bg-white w-full max-w-md hover:shadow-sm transition">
              <h3 className="text-xl font-semibold">{data.class.name}</h3>
              <p className="text-gray-600 mt-1 mb-5">{data.class.subject}</p>

              {session ? (
                <button
                  disabled={loading}
                  onClick={handleMarkAttendance}
                  className="px-3 py-2 text-sm w-full border  bg-gray-800 text-white hover:bg-black transition rounded-sm cursor-pointer"
                >
                  {loading ? "Marking..." : "Mark Attendance"}
                </button>
              ) : (
                <button
                  disabled
                  className="px-3 py-2 text-sm w-full border border-gray-400 text-gray-500 rounded-sm 
 cursor-not-allowed"
                >
                  Attendance Not Active
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <p>Loading dashboard...</p>
      )}
    </div>
  );
}
