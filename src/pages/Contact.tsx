import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Globe
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+234 XXX XXX XXXX", "+234 XXX XXX XXXX"],
      description: "Call us during business hours"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@cyberdata.ng", "support@cyberdata.ng"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Yola, Adamawa State", "Nigeria"],
      description: "Visit our training center"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "Sunday: Closed"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", href: "#" },
    { icon: Twitter, name: "Twitter", href: "#" },
    { icon: Instagram, name: "Instagram", href: "#" },
    { icon: Globe, name: "Website", href: "#" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Have questions about our courses? Need guidance on which program is right for you? 
              We're here to help you take the next step in your digital journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground flex items-center">
                    <Send className="mr-3 h-6 w-6 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-1"
                          placeholder="+234"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="What can we help you with?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="course-inquiry">Course Inquiry</SelectItem>
                          <SelectItem value="enrollment">Enrollment Questions</SelectItem>
                          <SelectItem value="pricing">Pricing Information</SelectItem>
                          <SelectItem value="technical-support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        className="mt-1"
                        rows={6}
                        placeholder="Tell us more about how we can help you..."
                      />
                    </div>

                    <Button type="submit" size="lg" variant="hero" className="w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-primary p-3 rounded-lg flex-shrink-0">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground mb-1">{detail}</p>
                          ))}
                          <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* WhatsApp Contact */}
              <Card className="border-0 shadow-soft bg-success text-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">WhatsApp Support</h3>
                      <p className="text-white/90 mb-3">Get instant responses to your questions</p>
                      <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-success">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Stay connected with us on social media for updates, tips, and success stories.
                  </p>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="hover:bg-primary hover:text-white hover:border-primary"
                      >
                        <social.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="border-0 shadow-soft bg-muted">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Quick Answers</h3>
                  <p className="text-muted-foreground mb-4">
                    Looking for quick answers? Check out our frequently asked questions.
                  </p>
                  <Button variant="outline" size="sm">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Find Our Location</h2>
            <p className="text-xl text-muted-foreground">
              Visit our modern training center in the heart of Yola
            </p>
          </div>
          
          <Card className="border-0 shadow-medium overflow-hidden">
            <div className="bg-gradient-primary h-64 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="h-16 w-16 mx-auto mb-4 opacity-60" />
                <h3 className="text-2xl font-semibold mb-2">Cyberdata Automations Limited</h3>
                <p className="text-white/80">Yola, Adamawa State, Nigeria</p>
                <Button variant="secondary" size="sm" className="mt-4">
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;