import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Eye, EyeClosed, CheckCircle2, X } from "lucide-react";
import { useSignup } from '@/hooks/useSignup';

const Signup = () => {
  const {
    error,
    nameError,
    emailError,
    passwordError,
    occupationError,
    showPassword,
    setShowPassword,
    passwordValidations,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleOccupationChange,
    handleSignUp
  } = useSignup();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSignUp} className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Fill in your details to create a new account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" onChange={handleNameChange} />
              {nameError && (
                <p className="text-sm text-red-600">{nameError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" onChange={handleEmailChange} />
              {emailError && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"}placeholder="••••••••" onChange={handlePasswordChange} />
                <div className="space-y-1 mt-2">
                  {passwordValidations.map((validation, index) => (
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        validation.valid ? "text-green-600" : "text-muted-foreground"
                      }`}
                      key={index}>
                      {validation.valid ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      <span>{validation.text}</span>
                    </div>
                  ))}
                </div>
                <Button type="button" className="absolute top-0 right-0 px-3 text-primary hover:bg-transparent hover:text-primary" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </Button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Occupation</Label>
              <Select onValueChange={handleOccupationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="filmmaker">Filmmaker</SelectItem>
                  <SelectItem value="artist">Artist</SelectItem>
                </SelectContent>
              </Select>
              {occupationError && (
                <p className="text-sm text-red-600">{occupationError}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-between">
            {error && (
              <div className="w-full mb-4 p-3 text-sm text-red-600 rounded-md">
                {error}
              </div>
            )}
            <Button className="w-full" type="submit" onClick={handleSignUp}>Sign Up</Button>
            <p className="mt-4 text-sm">
              Already have an account?
              <Link to="/signin" className="font-semibold text-chocolate hover:chocolate-hover ml-1">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}


export default Signup