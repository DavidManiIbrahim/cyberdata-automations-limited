import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const Assignments = () => {
  // Placeholder data - in real app, this would come from your database
  const assignments = [
    {
      id: "1",
      title: "JavaScript Fundamentals Quiz",
      course: "Web Development Basics",
      dueDate: "2024-01-25",
      status: "pending",
      description: "Complete the quiz covering variables, functions, and control structures."
    },
    {
      id: "2", 
      title: "React Component Project",
      course: "React Development",
      dueDate: "2024-01-28",
      status: "in-progress",
      description: "Build a todo application using React hooks and components."
    },
    {
      id: "3",
      title: "Database Design Assignment",
      course: "Database Management",
      dueDate: "2024-01-20",
      status: "completed",
      description: "Design a normalized database schema for an e-commerce system."
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-accent" />;
      default:
        return <ClipboardList className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      "in-progress": "secondary", 
      pending: "outline",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Assignments
        </h1>
        <p className="text-muted-foreground text-lg">
          Track your assignments and submit your work on time.
        </p>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="shadow-soft hover:shadow-medium transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(assignment.status)}
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(assignment.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {assignment.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  {assignment.status === 'completed' ? (
                    <Button variant="outline" size="sm" disabled>
                      Submitted
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">
                        {assignment.status === 'in-progress' ? 'Continue' : 'Start'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-12">
          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
          <p className="text-muted-foreground">
            Your assignments will appear here once you enroll in courses.
          </p>
        </div>
      )}
    </div>
  );
};

export default Assignments;