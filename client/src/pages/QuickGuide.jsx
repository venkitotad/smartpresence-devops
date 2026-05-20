import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlayCircle, UserCheck, MapPin, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: PlayCircle,
    title: "Step 1: Staff Starts Session",
    desc: "The teacher logs into the dashboard and starts a new attendance session.",
  },
  {
    icon: UserCheck,
    title: "Step 2: Student Opens Dashboard",
    desc: "Students log in and see the active attendance session available to mark.",
  },
  {
    icon: MapPin,
    title: "Step 3: Location Check",
    desc: "The system verifies the student's current GPS location using geofencing.",
  },
  {
    icon: CheckCircle2,
    title: "Step 4: Attendance Recorded",
    desc: "If the location is valid, attendance is marked and stored safely.",
  },
];

export default function QuickGuide() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 min-h-[85vh] flex flex-col items-center bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 tracking-tight">
        Quick Guide
      </h1>

      <div className="w-full max-w-2xl space-y-6 relative">
        {/* Simple gray vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-200 rounded-full" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="flex items-start relative">
              {/* Step icon */}
              <div className="z-10 bg-white border border-gray-300 rounded-full p-3 shadow-sm">
                <Icon className="text-gray-700 w-6 h-6" />
              </div>

              {/* Step card */}
              <Card className="ml-6 flex-1 border-gray-200 shadow-sm bg-white hover:shadow transition">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => navigate("/")}
        className="mt-10 bg-gray-800 text-white hover:bg-black shadow-sm px-6 py-2"
      >
        Back to Home
      </Button>
    </section>
  );
}
