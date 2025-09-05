import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Monitor,
  Code,
  Smartphone,
  Database,
  Globe,
  Palette,
  BarChart,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  Award
} from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Computer Basics & Digital Literacy",
      icon: Monitor,
      level: "Beginner",
      duration: "4 weeks",
      students: "200+",
      rating: 4.8,
      price: "₦15,000",
      description: "Master fundamental computer skills including Microsoft Office, internet browsing, email management, and basic troubleshooting.",
      features: [
        "Computer Hardware & Software Basics",
        "Microsoft Word, Excel & PowerPoint",
        "Internet & Email Management",
        "File Management & Organization",
        "Basic Troubleshooting"
      ],
      category: "Basic"
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      icon: Code,
      level: "Intermediate",
      duration: "8 weeks",
      students: "150+",
      rating: 4.9,
      price: "₦35,000",
      description: "Learn to build modern websites with HTML, CSS, JavaScript, and responsive design principles.",
      features: [
        "HTML5 & CSS3",
        "JavaScript Programming",
        "Responsive Web Design",
        "Bootstrap Framework",
        "Basic WordPress"
      ],
      category: "Programming"
    },
    {
      id: 3,
      title: "Mobile App Development",
      icon: Smartphone,
      level: "Advanced",
      duration: "12 weeks",
      students: "80+",
      rating: 4.7,
      price: "₦50,000",
      description: "Create mobile applications for Android and iOS using modern development frameworks.",
      features: [
        "React Native Development",
        "Mobile UI/UX Design",
        "API Integration",
        "App Store Deployment",
        "App Monetization"
      ],
      category: "Programming"
    },
    {
      id: 4,
      title: "Database Management",
      icon: Database,
      level: "Intermediate",
      duration: "6 weeks",
      students: "120+",
      rating: 4.6,
      price: "₦25,000",
      description: "Master database design, SQL queries, and data management with MySQL and Microsoft Access.",
      features: [
        "Database Design Principles",
        "SQL Query Writing",
        "MySQL Administration",
        "Data Analysis & Reporting",
        "Database Security"
      ],
      category: "Data"
    },
    {
      id: 5,
      title: "Digital Marketing & Social Media",
      icon: BarChart,
      level: "Beginner",
      duration: "6 weeks",
      students: "180+",
      rating: 4.8,
      price: "₦20,000",
      description: "Learn digital marketing strategies, social media management, and online business promotion.",
      features: [
        "Social Media Marketing",
        "Google Ads & Facebook Ads",
        "Content Creation & Strategy",
        "SEO Basics",
        "Analytics & Reporting"
      ],
      category: "Marketing"
    },
    {
      id: 6,
      title: "Graphic Design & Multimedia",
      icon: Palette,
      level: "Intermediate",
      duration: "10 weeks",
      students: "100+",
      rating: 4.7,
      price: "₦30,000",
      description: "Create stunning visual content with Adobe Creative Suite and modern design principles.",
      features: [
        "Adobe Photoshop & Illustrator",
        "Logo & Brand Design",
        "Video Editing Basics",
        "Print & Digital Design",
        "Portfolio Development"
      ],
      category: "Design"
    },
    {
      id: 7,
      title: "Cybersecurity Fundamentals",
      icon: Shield,
      level: "Intermediate",
      duration: "8 weeks",
      students: "90+",
      rating: 4.9,
      price: "₦40,000",
      description: "Protect digital assets and learn cybersecurity best practices for individuals and businesses.",
      features: [
        "Network Security Basics",
        "Threat Detection & Prevention",
        "Ethical Hacking Introduction",
        "Security Auditing",
        "Incident Response"
      ],
      category: "Security"
    },
    {
      id: 8,
      title: "E-commerce & Online Business",
      icon: Globe,
      level: "Beginner",
      duration: "5 weeks",
      students: "160+",
      rating: 4.6,
      price: "₦18,000",
      description: "Start and manage your online business with e-commerce platforms and digital payment systems.",
      features: [
        "E-commerce Platform Setup",
        "Online Payment Integration",
        "Digital Marketing for E-commerce",
        "Customer Service Management",
        "Business Analytics"
      ],
      category: "Business"
    }
  ];

  const categories = ["All", "Basic", "Programming", "Data", "Marketing", "Design", "Security", "Business"];
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "success";
      case "Intermediate": return "accent";
      case "Advanced": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Training Courses
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              Choose from our comprehensive range of courses designed to equip you 
              with in-demand digital skills for the modern workplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll">
                <Button size="lg" variant="secondary">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Enroll Today
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="hero-outline">
                  Need Guidance?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Category Filter - Optional for future enhancement */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={course.id} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-primary p-3 rounded-lg">
                      <course.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant={getLevelColor(course.level) as any} className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground">{course.title}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  {/* Course Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">What you'll learn:</h4>
                    <ul className="space-y-1">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {course.features.length > 3 && (
                        <li className="text-xs text-muted-foreground ml-5">
                          +{course.features.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">{course.price}</span>
                        <span className="text-sm text-muted-foreground ml-1">total</span>
                      </div>
                      <Link to="/enroll" state={{ selectedCourse: course.title }}>
                        <Button size="sm" variant="hero">
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Courses?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide more than just training - we provide a pathway to your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Industry Certification",
                description: "Receive recognized certificates upon course completion"
              },
              {
                icon: Users,
                title: "Expert Instructors",
                description: "Learn from experienced professionals in their fields"
              },
              {
                icon: Monitor,
                title: "Hands-on Practice",
                description: "Work on real projects with modern equipment"
              },
              {
                icon: Clock,
                title: "Flexible Schedule",
                description: "Choose from morning, afternoon, or weekend classes"
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-0 shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join our courses today and gain the skills that employers are looking for
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Enroll in a Course
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="hero-outline" className="w-full sm:w-auto">
                  Speak to an Advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;