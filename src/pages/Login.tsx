import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
 

const Login = () => {
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      // Test: fetch user profile from database after login
      const { data: { user: signedInUser } } = await supabase.auth.getUser();
      if (signedInUser) {
        // Example: fetch user roles
        const { data: rolesData, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', signedInUser.id);
        if (rolesData && rolesData.length > 0) {
          // Data received from DB
          toast({
            title: "Login Success",
            description: `Roles: ${rolesData.map(r => r.role).join(", ")}`,
            variant: "default",
          });
          // Redirect based on role
          if (rolesData.some((r: any) => r.role === 'admin')) {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          toast({
            title: "Login Success",
            description: "No roles found for this user. Redirecting to dashboard...",
            variant: "default",
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Sign In Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password, fullName, role);
      toast({
        title: "Sign Up Success",
        description: "Account created. Please check your email to verify.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Sign Up Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                <CardTitle className="text-2xl text-foreground">Student Portal</CardTitle>
                <p className="text-muted-foreground">
                  Sign in to your account or create a new one
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="space-y-6 mt-6">
                    <form onSubmit={handleSignIn} className="space-y-6">
                      <div>
                        <Label htmlFor="signin-email">Email Address</Label>
                        <div className="relative mt-1">
                          <Input
                            id="signin-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10"
                            placeholder="your@email.com"
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                      <Button type="submit" size="lg" variant="hero" className="w-full" disabled={loading}>
                        <LogIn className="mr-2 h-5 w-5" />
                        {loading ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-6 mt-6">
                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div>
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative mt-1">
                          <Input
                            id="signup-name"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="pl-10"
                            placeholder="Enter your full name"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signup-email">Email Address</Label>
                        <div className="relative mt-1">
                          <Input
                            id="signup-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10"
                            placeholder="your@email.com"
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pl-10 pr-10"
                            placeholder="Create a password (min 6 characters)"
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

                      <div>
                        <Label>Account Type</Label>
                        <RadioGroup
                          value={role}
                          onValueChange={(value) => setRole(value as "user" | "admin")}
                          className="flex flex-row gap-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="user" id="student" />
                            <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer">
                              <GraduationCap className="h-4 w-4 text-primary" />
                              Student
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="admin" id="admin" />
                            <Label htmlFor="admin" className="flex items-center gap-2 cursor-pointer">
                              <Shield className="h-4 w-4 text-accent" />
                              Admin
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="submit" size="lg" variant="hero" className="w-full" disabled={loading}>
                        <User className="mr-2 h-5 w-5" />
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
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
                        Create an account to enroll in courses and track progress
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