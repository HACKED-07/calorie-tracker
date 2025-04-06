"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { ReportsView } from "@/components/reports-view";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);

    try {
      // Replace with your actual deployed Flask backend URL
      const backendUrl = "http://localhost:5001"; // Adjust if needed

      const response = await fetch(
        `${backendUrl}/generate_nutrition_report_endpoint`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("error generating");
        setLoading(false);
        return;
      }

      // The Flask server is sending the PDF as a Blob
      const blob = await response.blob();

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Nutrition_Report.pdf"); // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reports"
        text="View detailed health and nutrition reports."
      />
      <div className="grid gap-4 md:gap-8">
        <ReportsView />
      </div>
      <Button onClick={generateReport} disabled={loading}>
        {loading ? "Generating Report..." : "Generate Nutrition Report"}
      </Button>
    </DashboardShell>
  );
}
