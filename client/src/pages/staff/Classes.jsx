import React, { useEffect, useState } from "react";
import { api, useClerkToken } from "../../utils/api";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Classes() {
  const getToken = useClerkToken();
  const { isLoaded } = useUser();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ NEW

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); // ✅ start loader

        const token = await getToken();

        const res = await api.get("/api/staff/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClasses(res.data?.classes || []);
      } catch (err) {
        if (err.response?.status === 403) {
          setError("Access denied.");
          navigate("/access-denied");
        } else {
          setError("Failed to load classes.");
          console.error(err);
        }
      } finally {
        setLoading(false); // ✅ stop loader (important)
      }
    })();
  }, []);

  if (!isLoaded || loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-gray-600 text-sm">Loading classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Classes</h2>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {classes.length === 0 && !error && (
        <p className="text-gray-500">No classes assigned.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="border rounded-xl shadow-sm bg-white p-6 transition hover:shadow-md"
          >
            {/* TITLE */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{cls.name}</h3>
              <p className="text-gray-500 mt-1">{cls.subject}</p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={async () => {
                  try {
                    const token = await getToken();

                    const res = await api.post(
                      "/api/staff/start-session",
                      { classId: cls.id },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );

                    toast.success("Session Started", {
                      description: `Session Code: ${res.data.session.session_code}`,
                    });
                  } catch (err) {
                    toast.error(
                      err.response?.data?.error || "Error starting session"
                    );
                  }
                }}
                className="bg-[#0470e3] text-white font-semibold  py-2 px-6 border border-blue-700 hover:border-transparent rounded
                 cursor-pointer text-sm"
              >
                Take Attendance
              </button>

              <button
                className="bg-red-800 text-white font-semibold hover:bg-red-700 py-2 px-6 border border-red-900 hover:border-transparent rounded
                 cursor-pointer text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
