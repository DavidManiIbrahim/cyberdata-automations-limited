import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CheckCircle,
  Clock,
  Award
} from "lucide-react";

const Enroll = () => {
  const location = useLocation();
  const { toast } = useToast();
  const selectedCourse = location.state?.selectedCourse || "";
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    course: selectedCourse,
    agreeTerms: false
  });

  const courses = [
    "Computer Basics & Digital Literacy",
    "Web Development Fundamentals",
    "Mobile App Development",
    "Database Management",
    "Digital Marketing & Social Media",
    "Graphic Design & Multimedia",
    "Cybersecurity Fundamentals",
    "E-commerce & Online Business"
  ];


  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Enrollment Submitted!",
      description: "We'll contact you within 24 hours to confirm your enrollment and payment details.",
    });

    console.log("Enrollment submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Enroll in Our Courses
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Take the first step towards transforming your digital skills. 
              Fill out the form below to secure your spot.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Enrollment Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <GraduationCap className="mr-3 h-6 w-6 text-primary" />
                    Enrollment Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <User className="mr-2 h-5 w-5 text-primary" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="mt-1"
                          placeholder="+234"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Course Selection */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                        Course Details
                      </h3>
                      <div>
                        <Label htmlFor="course">Select Course *</Label>
                        <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Choose a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeTerms", !!checked)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          I agree to the <span className="text-primary underline cursor-pointer">Terms and Conditions</span> and 
                          <span className="text-primary underline cursor-pointer"> Privacy Policy</span>. 
                          I understand that enrollment is subject to course availability and payment confirmation.
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" size="lg" variant="hero" className="w-full">
                      Submit Enrollment Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Enrollment Benefits */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: CheckCircle, text: "Comprehensive course materials" },
                    { icon: Award, text: "Industry-recognized certificate" },
                    { icon: Clock, text: "Flexible learning schedule" },
                    { icon: User, text: "One-on-one instructor support" },
                    { icon: GraduationCap, text: "Job placement assistance" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <benefit.icon className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Call Us</p>
                      <p className="text-sm text-muted-foreground">+234 XXX XXX XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Email Us</p>
                      <p className="text-sm text-muted-foreground">info@cyberdata.ng</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Visit Us</p>
                      <p className="text-sm text-muted-foreground">Yola, Adamawa State, Nigeria</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-0 shadow-soft bg-gradient-primary text-white">
                <CardHeader>
                  <CardTitle className="text-xl">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">1</span>
                    </div>
                    <p className="text-sm text-white/90">We review your application within 24 hours</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">2</span>
                    </div>
                    <p className="text-sm text-white/90">Our team contacts you to confirm details</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">3</span>
                    </div>
                    <p className="text-sm text-white/90">Complete payment and start your course</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enroll;