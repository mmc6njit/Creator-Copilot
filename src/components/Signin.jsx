import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Eye, EyeClosed } from "lucide-react";
import { useState } from 'react';


const Signin = () => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your existing account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
              <Button className="absolute top-0 right-0 px-3 text-primary hover:bg-transparent hover:text-primary" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <Button className="w-full">Sign In</Button>
          <p className="mt-4 text-sm">
            Don't have an account?
            <Link to="/signup" className="font-semibold text-chocolate hover:chocolate-hover ml-1">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signin