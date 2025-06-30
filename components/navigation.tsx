import React from "react";
import { Link, useLocation } from "wouter";
import { MessageCircle, Settings, Crown, Home, Menu, Users, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

export function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();


  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/about", icon: Users, label: "About" },
    { path: "/products", icon: Package, label: "Products" },
    { path: "/contact", icon: Mail, label: "Contact" },
    { path: "/chat", icon: MessageCircle, label: "Chat Bot" },
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/upgrade", icon: Crown, label: "Upgrade" },
  ];

  const NavContent = () => (
    <nav className="flex flex-col space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        
        return (
          <Link key={item.path} href={item.path}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-12 transition-all duration-300 ${
                isActive ? 'bg-teal-500 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {item.path === "/upgrade" && user?.subscriptionTier !== "premium" && (
                <Badge variant="secondary" className="ml-auto text-xs rounded-full">
                  Free
                </Badge>
              )}
            </Button>
          </Link>
        );
      })}
    </nav>
  );



  return (
    <>

      {/* Mobile Navigation Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-800 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">LP</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">LightPrompt</h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                <Menu className="h-6 w-6 text-teal-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-black border-gray-800">
              <div className="mt-8">
                <div className="mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                    <span className="text-white font-bold">LP</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">LightPrompt</h2>
                    <p className="text-sm text-gray-400 font-medium">Soul Technology</p>
                  </div>
                </div>
                
                <NavContent />
                

                
                {isAuthenticated && (
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800">
                      <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-white">
                          {user?.firstName || user?.email?.split("@")[0] || "User"}
                        </p>
                        <p className="text-xs text-gray-400 capitalize font-medium">
                          {user?.subscriptionTier || "basic"} consciousness
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Content Spacer for mobile header only */}
      <div className="h-16 flex-shrink-0" />
    </>
  );
}