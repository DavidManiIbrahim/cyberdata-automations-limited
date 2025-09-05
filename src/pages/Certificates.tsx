import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Certificates() {
  const { user } = useAuth();

  // Mock certificates data - replace with actual data from your backend
  const certificates = [
    {
      id: 1,
      courseName: "Computer Basics",
      completedDate: "2024-01-15",
      certificateUrl: "/certificates/computer-basics-cert.pdf",
      grade: "A"
    },
    {
      id: 2,
      courseName: "Digital Marketing",
      completedDate: "2024-02-28",
      certificateUrl: "/certificates/digital-marketing-cert.pdf",
      grade: "B+"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3">
        <Trophy className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-muted-foreground">View and download your course completion certificates</p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground text-center">
              Complete your courses to earn certificates that you can download and share.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  {cert.courseName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Completed: {new Date(cert.completedDate).toLocaleDateString()}
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Grade: {cert.grade}</Badge>
                  <Button size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}