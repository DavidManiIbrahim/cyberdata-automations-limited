import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import instructorImage from "@/assets/instructor.jpg";
import studentsSuccessImage from "@/assets/students-success.jpg";
import {
  Target,
  Eye,
  Users,
  Award,
  Clock,
  CheckCircle,
  Heart,
  Star,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Globe
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Musa Ibrahim",
      role: "Founder & Lead Instructor",
      image: instructorImage,
      specialties: ["Web Development", "Database Management"],
      experience: "5+ years",
      description: "Passionate about empowering students with practical tech skills"
    },
    {
      name: "Aisha Mohammed",
      role: "Digital Marketing Instructor",
      image: "/placeholder.svg",
      specialties: ["Social Media Marketing", "Content Strategy"],
      experience: "4+ years",
      description: "Expert in helping businesses grow their online presence"
    },
    {
      name: "David Yakubu",
      role: "Programming Instructor",
      image: "/placeholder.svg",
      specialties: ["Mobile App Development", "Software Engineering"],
      experience: "6+ years",
      description: "Former software engineer turned educator with industry experience"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in education and student outcomes"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We are passionate about technology and helping others succeed"
    },
    {
      icon: Users,
      title: "Community",
      description: "We build a supportive learning community where everyone thrives"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new technologies and teaching methods"
    }
  ];

  const achievements = [
    { icon: Users, number: "500+", label: "Students Trained" },
    { icon: Award, number: "95%", label: "Success Rate" },
    { icon: Star, number: "4.8/5", label: "Average Rating" },
    { icon: Clock, number: "2", label: "Years of Excellence" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Cyberdata Automations Limited
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Empowering the next generation with digital skills and computer literacy 
              in Yola, Nigeria. Your gateway to technology excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2022 in the heart of Yola, Adamawa State, Cyberdata Automations Limited 
                  was born from a simple yet powerful vision: to bridge the digital divide and empower 
                  our community with essential technology skills.
                </p>
                <p>
                  Recognizing the growing demand for digital literacy in Nigeria's evolving economy, 
                  our founder Musa Ibrahim assembled a team of passionate educators and industry professionals 
                  dedicated to providing world-class computer training right here in Northern Nigeria.
                </p>
                <p>
                  Today, we're proud to have trained over 500 students across various programs, 
                  from basic computer literacy to advanced programming and digital marketing. 
                  Our graduates have gone on to start their own businesses, secure better employment, 
                  and become leaders in their communities.
                </p>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img 
                src={studentsSuccessImage} 
                alt="Students celebrating success" 
                className="rounded-lg shadow-large w-full"
              />
              <div className="absolute -top-6 -left-6 bg-secondary p-4 rounded-lg shadow-medium text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm">Lives Changed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-primary p-3 rounded-lg mr-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To provide accessible, high-quality computer training and digital literacy programs 
                  that equip individuals with the skills needed to thrive in today's technology-driven world, 
                  while contributing to the economic development of Northern Nigeria.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-soft">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-secondary p-3 rounded-lg mr-4">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To become the leading computer training institute in Northern Nigeria, 
                  recognized for excellence in digital education and for producing skilled graduates 
                  who drive technological advancement in their communities.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Values */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h3>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-soft text-center hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate educators and industry professionals dedicated to your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-accent p-2 rounded-full">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      <strong>Experience:</strong> {member.experience}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-white/80 text-lg">Numbers that reflect our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center animate-scale-in">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{achievement.number}</div>
                <div className="text-white/80 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Learning Community
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Become part of a growing network of skilled professionals transforming Northern Nigeria's digital landscape
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Our Courses
                </Button>
              </Link>
              <Link to="/enroll">
                <Button size="lg" variant="hero-outline" className="w-full sm:w-auto">
                  Start Your Journey
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

export default About;