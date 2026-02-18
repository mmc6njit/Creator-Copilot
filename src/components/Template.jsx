import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Camera } from "lucide-react";

const Template = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Card className="w-100">
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>
              These are the color palette for the application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold text-pearl-beige hover:text-pearl-beige-hover">
              Pearl Beige
            </h1>
            <h1 className="text-2xl font-bold text-chocolate hover:text-chocolate-hover">
              Chocolate
            </h1>
            <h1 className="text-2xl font-bold text-shadow-grey hover:text-shadow-grey-hover">
              Shadow Grey
            </h1>
            <h1 className="text-2xl font-bold text-bright-marine hover:text-bright-marine-hover">
              Bright Marine
            </h1>
            <h1 className="text-2xl font-bold text-indigo-velvet hover:text-indigo-velvet-hover">
              Indigo Velvet
            </h1>
            <h1 className="text-2xl font-bold text-linen hover:text-linen-hover">
              Linen
            </h1>
            <h1 className="text-2xl font-bold text-sage-green hover:text-sage-green-hover">
              Sage Green
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <Camera color="chocolate" size={48} />
              <h1 className="text-lg font-semibold">This is Lucide Icons</h1>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Button</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Template;
