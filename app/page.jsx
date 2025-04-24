"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@components/Header/index.jsx";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit3, TrendingUp, Award, ArrowRight, DollarSign, Star, Code, Shield, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Header
        logo="/img/logo.png"
        logoAlt="WriteToEarn"
        menuItems={[
          { label: "Home", href: "/" },
          { label: "Campaigns", href: "/apps" },
          { label: "Documentation", href: "/docs" },
          { label: "About", href: "/about" }
        ]}
        rightItems={[
          <Link key="create" href="/apps/create">
            <Button variant="outline" className="mr-2 rounded-full border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </Link>,
          <Link key="apps" href="/apps">
            <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              Explore Apps
            </Button>
          </Link>,
        ]}
        glassMorphism={true}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-cyan-500/20 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[25vw] h-[25vw] bg-emerald-500/20 rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0 z-10 animate-fade-in">
              <Badge variant="outline" className="mb-6 py-1.5 px-4 border-emerald-500/30 bg-emerald-500/5 text-emerald-400">
                The future of content creation
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Write & Earn <br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  With Crypto
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
                Join a revolutionary platform where your content creates value. 
                Write quality articles for campaigns and earn crypto rewards based on AI-scored performance.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/apps">
                  <Button className="rounded-full py-6 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 text-base">
                    Explore Campaigns
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/apps/account/register">
                  <Button variant="outline" className="rounded-full py-6 px-8 border-gray-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 text-base">
                    Start Writing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-5/12 relative z-10">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-cyan-500/20 rounded-full blur-[30px]"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-[30px]"></div>
                
                {/* Main illustration */}
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-1 shadow-xl">
                  <div className="bg-gradient-to-br from-black to-gray-900/80 rounded-3xl overflow-hidden">
                    <Image 
                      src="/img/coffee-1.png" 
                      alt="Write to Earn" 
                      width={600} 
                      height={400} 
                      className="rounded-2xl opacity-90 object-cover w-full h-[400px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 rounded-3xl"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 backdrop-blur-md flex items-center justify-center">
                          <Edit3 className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Content That Earns</h3>
                          <p className="text-sm text-gray-400">Get rewarded for quality writing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating card */}
                <div className="absolute -bottom-12 -right-12 w-56 bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4 shadow-[0_15px_30px_-8px_rgba(0,0,0,0.3)] border border-gray-800 animate-float">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 backdrop-blur-md flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Current Reward Pool</p>
                      <p className="text-base font-semibold text-white">$27,500 USDC</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 mb-1">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-1.5 rounded-full w-[75%]"></div>
                  </div>
                </div>
                
                {/* Another floating element */}
                <div className="absolute -top-10 -left-10 bg-gray-900/90 backdrop-blur-sm rounded-2xl py-2 px-4 shadow-[0_15px_30px_-8px_rgba(0,0,0,0.3)] border border-gray-800 animate-float-slow">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium text-white">3,256 Writers Rewarded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { number: "$340K+", label: "Rewards Distributed", icon: <DollarSign className="h-4 w-4 text-emerald-400" /> },
              { number: "7.5K+", label: "Content Creators", icon: <Edit3 className="h-4 w-4 text-cyan-400" /> },
              { number: "120+", label: "Active Campaigns", icon: <Star className="h-4 w-4 text-amber-400" /> },
              { number: "15+", label: "Blockchains Supported", icon: <Code className="h-4 w-4 text-purple-400" /> },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 rounded-3xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 hover:border-gray-700/50 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-full bg-gray-800/70 backdrop-blur-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-500">
                  {stat.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 py-1.5 px-4 border-cyan-500/30 bg-cyan-500/5 text-cyan-400">
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
              How Write-to-Earn Works
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our platform connects content creators with campaigns, rewarding quality writing with cryptocurrency rewards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                title: "Join Campaigns",
                desc: "Browse and join campaigns from brands and DAOs looking for quality content on specific topics.",
                icon: <PlusCircle className="h-6 w-6" />,
                color: "from-purple-400 to-blue-400",
                bgColor: "bg-purple-500/10",
                borderColor: "border-purple-500/20"
              },
              {
                title: "Create Content",
                desc: "Write high-quality articles, threads or tutorials that match campaign requirements and objectives.",
                icon: <Edit3 className="h-6 w-6" />,
                color: "from-emerald-400 to-cyan-400",
                bgColor: "bg-emerald-500/10", 
                borderColor: "border-emerald-500/20"
              },
              {
                title: "Earn Rewards",
                desc: "Get paid in crypto based on AI-scored quality metrics and post-performance analytics.",
                icon: <Award className="h-6 w-6" />,
                color: "from-amber-400 to-orange-400",
                bgColor: "bg-amber-500/10",
                borderColor: "border-amber-500/20"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-3xl blur-[20px] opacity-0 group-hover:opacity-80 transition-all duration-700 -z-10"></div>
                <Card className={`p-1 bg-gradient-to-br ${step.bgColor} rounded-3xl h-full hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-500 border-none`}>
                  <CardContent className="bg-gray-900/90 rounded-3xl p-8 h-full flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.bgColor} backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 border ${step.borderColor}`}>
                      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${step.color}`}>
                        {step.icon}
                      </div>
                    </div>
                    <h3 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${step.color}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      {step.desc}
                    </p>
                    <div className="flex items-center text-sm">
                      <div className="flex -space-x-2 mr-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-7 h-7 rounded-full bg-gray-700/80 border border-gray-800"></div>
                        ))}
                      </div>
                      <p className="text-gray-500">+{(index + 1) * 540} writers</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Roles Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <Badge variant="outline" className="mb-6 py-1.5 px-4 border-emerald-500/30 bg-emerald-500/5 text-emerald-400">
                For Everyone
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Core Platform Roles
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Our ecosystem thrives with two key participants working together to create value.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <Button variant="outline" asChild className="rounded-full py-6 px-8 border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 text-base">
                <Link href="/about">
                  Learn More About Roles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {[
              {
                role: "Writer",
                desc: "Create content aligned with campaigns and earn crypto rewards based on AI scores and post-performance metrics.",
                features: [
                  "Earn crypto for quality writing",
                  "Choose campaigns matching your expertise",
                  "Get transparent, AI-based scoring",
                  "Receive performance bonuses for viral content"
                ],
                image: "/img/coffee-2.png",
                color: "from-emerald-400 to-cyan-400",
                bgColor: "bg-emerald-500/10"
              },
              {
                role: "Campaign Creator",
                desc: "Brands, DAOs, or influencers who launch campaigns to promote specific topics or products with defined metrics.",
                features: [
                  "Create targeted content campaigns",
                  "Pay only for quality content that delivers",
                  "Access detailed analytics dashboards",
                  "Staked tokens ensure accountability"
                ],
                image: "/img/coffee-1.png",
                color: "from-amber-400 to-orange-400",
                bgColor: "bg-amber-500/10"
              }
            ].map((role, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-800/60 rounded-3xl blur-[20px] opacity-0 group-hover:opacity-80 transition-all duration-700 -z-10"></div>
                <Card className={`p-1 ${role.bgColor} rounded-3xl hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden border-none`}>
                  <CardContent className="bg-gray-900/90 rounded-3xl p-0 flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden rounded-t-3xl">
                      <Image
                        src={role.image}
                        alt={role.role}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${role.color}`}>
                          {role.role}
                        </h3>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-gray-400 mb-6">
                        {role.desc}
                      </p>
                      <ul className="space-y-3 mb-6">
                        {role.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className={`h-5 w-5 mr-3 mt-0.5 text-transparent bg-clip-text bg-gradient-to-r ${role.color}`} />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className={`w-full rounded-full mt-4 border-gray-800 hover:bg-${role.bgColor} hover:border-${role.borderColor} transition-all duration-300`}>
                        <Link href={index === 0 ? "/apps" : "/apps/create"}>
                          {index === 0 ? "Start Writing" : "Create Campaign"}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 sm:px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-[50px] opacity-70"></div>
            <div className="relative bg-gradient-to-r from-gray-900/95 to-black rounded-3xl overflow-hidden border border-gray-800/50 backdrop-blur-sm shadow-2xl">
              <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none">
                <div className="absolute right-0 bottom-0 w-full h-full bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/30 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/30 rounded-full blur-[80px]"></div>
              
              <div className="p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-2/3">
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                    Ready to start earning with your writing?
                  </h2>
                  <p className="text-lg text-gray-400 mb-8 max-w-xl">
                    Join thousands of writers already earning crypto rewards for their content. 
                    Create an account today and start browsing campaigns that match your expertise.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild className="rounded-full py-6 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 text-base">
                      <Link href="/apps/account/register">
                        Create Free Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full py-6 px-8 border-gray-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 text-base">
                      <Link href="/apps">
                        Browse Campaigns
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="lg:w-1/3 relative">
                  <div className="relative w-60 h-60 md:w-72 md:h-72">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 animate-pulse"></div>
                    <div className="absolute inset-4 rounded-full border-2 border-dashed border-emerald-500/30 animate-spin-slow"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-16 h-16 text-emerald-400/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 relative">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800/50 pt-8">
            <div className="mb-6 md:mb-0">
              <Image src="/img/logo.png" alt="WriteToEarn" width={150} height={40} className="h-8 w-auto" />
              <p className="text-sm text-gray-500 mt-2">© 2025 Write-to-Earn. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Docs</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
