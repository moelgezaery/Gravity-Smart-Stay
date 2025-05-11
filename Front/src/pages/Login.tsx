
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Image } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication - in a real app, this would make an API call
    setTimeout(() => {
      // Demo credentials: admin@hotel.com / password
      if (email === "admin@hotel.com" && password === "password") {
        toast({
          title: "Login successful",
          description: "Welcome back to Hotel Management System",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl flex rounded-lg overflow-hidden shadow-xl">
        {/* Hotel image side */}
        <div className="hidden md:block md:w-1/2 bg-primary">
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
                <Image className="h-24 w-24 mx-auto mb-4 text-white" />
                <h2 className="text-3xl font-bold text-white mb-2">Smart Stay</h2>
                <p className="text-white/90">Your premier hotel management solution</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Login form side */}
        <div className="w-full md:w-1/2 bg-white p-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Smart Stay</h1>
              <p className="text-gray-500 mt-2">Sign in to access the dashboard</p>
            </div>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="p-0 pb-6">
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 p-0">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@hotel.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="p-0 h-auto" type="button">
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="p-0 pt-6">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <div className="text-center text-sm text-gray-500 mt-6">
              <p>
                Demo credentials: admin@hotel.com / password
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
