import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  User,
  Shield
} from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login
    toast({
      title: "Login Successful!",
      description: "Welcome back to your student dashboard.",
    });

    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Login Card */}
            <Card className="border-0 shadow-large">
              <CardHeader className="text-center pb-6">
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground">Student Login</CardTitle>
                <p className="text-muted-foreground">
                  Access your courses and track your progress
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="pl-10"
                        placeholder="your@email.com"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                        className="pl-10 pr-10"
                        placeholder="Enter your password"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange("rememberMe", !!checked)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" size="lg" variant="hero" className="w-full">
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/enroll" className="text-primary hover:underline font-medium">
                      Enroll in a course
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Cards */}
            <div className="mt-8 space-y-4">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">New Student?</p>
                      <p className="text-xs text-muted-foreground">
                        Enroll in any course to get your login credentials
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-success flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Secure Access</p>
                      <p className="text-xs text-muted-foreground">
                        Your data is protected with industry-standard security
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Need help accessing your account?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/contact">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  WhatsApp Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;