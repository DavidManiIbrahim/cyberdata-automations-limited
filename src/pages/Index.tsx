import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-classroom.jpg";
import instructorImage from "@/assets/instructor.jpg";
import studentsSuccessImage from "@/assets/students-success.jpg";
import {
  GraduationCap,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
  Monitor,
  Code,
  Smartphone,
  Database,
  ArrowRight,
  Play,
  BookOpen,
  Trophy,
  TrendingUp
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Monitor,
      title: "Computer Basics",
      description: "Master fundamental computer skills, from basic operations to advanced productivity tools."
    },
    {
      icon: Code,
      title: "Programming",
      description: "Learn popular programming languages like Python, JavaScript, and web development."
    },
    {
      icon: Smartphone,
      title: "Digital Literacy",
      description: "Stay current with digital trends, social media management, and online safety."
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Excel, databases, and data analysis skills for the modern workplace."
    }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Students Trained" },
    { icon: Award, number: "95%", label: "Success Rate" },
    { icon: Clock, number: "2", label: "Years Experience" },
    { icon: BookOpen, number: "15+", label: "Courses Available" }
  ];

  const testimonials = [
    {
      name: "Amina Mohammed",
      course: "Web Development",
      image: "/placeholder.svg",
      text: "The training at Cyberdata transformed my career. I went from knowing nothing about computers to building my own websites!"
    },
    {
      name: "Ibrahim Yakubu",
      course: "Computer Basics",
      image: "/placeholder.svg",
      text: "Excellent instructors and practical approach. I'm now confident using computers for my business."
    },
    {
      name: "Fatima Aliyu",
      course: "Digital Marketing",
      image: "/placeholder.svg",
      text: "The skills I learned helped me start my online business. Best investment I ever made!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Digital Skills in
              <span className="text-secondary"> Yola, Nigeria</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Transform your future with comprehensive computer training, programming courses, 
              and digital literacy programs designed for the modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/courses">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Courses
                </Button>
              </Link>
              <Link to="/enroll">
                <Button size="lg" variant="hero-outline" className="w-full sm:w-auto">
                  <Play className="mr-2 h-5 w-5" />
                  Enroll Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Cyberdata?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide practical, hands-on training that prepares you for real-world challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Empowering Yola with Digital Education
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Cyberdata Automations Limited, we believe everyone deserves access to quality 
                digital education. Our experienced instructors use modern teaching methods to ensure 
                you gain practical skills that matter in today's job market.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Hands-on practical training",
                  "Industry-experienced instructors",
                  "Modern computer lab facilities",
                  "Flexible learning schedules",
                  "Certificate upon completion"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button variant="hero" size="lg">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative animate-fade-in">
              <img 
                src={instructorImage} 
                alt="Professional instructor teaching" 
                className="rounded-lg shadow-large w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-medium">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-6 w-6 text-accent" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Award Winning</div>
                    <div className="text-xs text-muted-foreground">Training Institute</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from real students who transformed their careers with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-scale-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Digital Journey?
            </h2>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Join hundreds of students who have already transformed their careers. 
              Your future in technology starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Enroll Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
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

export default Index;
