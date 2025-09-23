
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const dummyMaterials = [
  {
    id: 1,
    title: "Introduction to Python",
    description: "PDF slides and code examples for Python basics.",
    type: "PDF",
    size: "2.1 MB",
    link: "#"
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Comprehensive guide to React.js with sample projects.",
    type: "ZIP",
    size: "5.4 MB",
    link: "#"
  },
  {
    id: 3,
    title: "Database Design Cheat Sheet",
    description: "Quick reference for SQL and ER diagrams.",
    type: "PDF",
    size: "1.2 MB",
    link: "#"
  },
  {
    id: 4,
    title: "JavaScript Practice Tasks",
    description: "Set of exercises to improve your JS skills.",
    type: "DOCX",
    size: "800 KB",
    link: "#"
  },
];

const Materials = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Materials</h1>
      <p className="mb-8 text-muted-foreground">Access your course materials below. Click download to get the files.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyMaterials.map((material) => (
          <Card key={material.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {material.title}
                <span className="ml-auto text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground border border-muted-foreground/20">{material.type}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-muted-foreground">{material.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{material.size}</span>
                <Button asChild variant="outline" size="sm">
                  <a href={material.link} download>
                    <Download className="h-4 w-4 mr-1" /> Download
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Materials;
