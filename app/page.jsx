"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@components/Header/index.jsx";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Edit3,
  TrendingUp,
  Award,
  ArrowRight,
  DollarSign,
  Star,
  Code,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";
import NoiseBg from "@/components/NoiseBg";
import DecryptedText from "@/components/DecryptedText";
import { motion } from "framer-motion";
import Waves from "@/components/Waves";
import HowItWorksBlocks from './components/HowItWorksBlocks.jsx';

export default function Home() {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom easing curve for fluid animation
      },
    },
  };

  return (
    <>
      <Header
        LogoComponent={<Logo href="/apps" />}
        menuItems={
          [
            // { label: "Home", href: "/" },
            // { label: "Campaigns", href: "/apps" },
            // { label: "Documentation", href: "/docs" },
            // { label: "About", href: "/about" }
          ]
        }
        rightItems={[
          <Link key="create" href="/apps/create">
            <Button
              variant="outline"
              className="mr-2 rounded-full border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </Link>,
          <Link key="apps" href="/apps">
            <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-720 hover:to-cyan-720 border-0 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
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
      {/* <section className="h-[80vh] relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"> */}
      <section className="h-[100vh] flex flex-row justify-end items-center overflow-hidden">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="min-h-[400px] w-full block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <DecryptedText
                text="WRITE."
                speed={100}
                maxIterations={20}
                characters="z!?<>:@'+]{]|*^%$#@!~`"
                className="revealed font-extrabold text-9xl text-transparent text-white opacity-80 hover:opacity-30 duration-300"
                parentClassName="font-extrabold text-9xl text-transparent text-white"
                encryptedClassName="encrypted"
                animateOn="view"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <DecryptedText
                text="CONTRIBUTE."
                speed={100}
                maxIterations={25}
                characters="&918KL\\;MS)XK0981!?"
                className="revealed font-extrabold text-9xl text-transparent text-white opacity-80 hover:opacity-30 duration-300"
                parentClassName="font-extrabold text-9xl text-transparent text-white "
                encryptedClassName="encrypted"
                animateOn="view"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DecryptedText
                text="EARN."
                speed={100}
                maxIterations={30}
                characters="20klkcas09128[\\!/?xsasd902,,<>"
                className="revealed font-extrabold text-9xl text-transparent text-white "
                parentClassName="font-extrabold text-9xl text-transparent text-white "
                encryptedClassName="encrypted"
                animateOn="view"
              />
            </motion.div>
          </motion.div>
          <NoiseBg
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-24 pt-8">
            <p className="text-3xl leading-relaxed text-white text-center max-w-4xl mx-auto">
              Connects content creators with campaigns, rewarding quality
              writing with cryptocurrency rewards.
            </p>
          </div>

          <div className="flex justify-between w-full max-w-6xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <HowItWorksBlocks 
                text='Join Campaigns'
                className="border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-400 group backdrop-blur-sm"
                children={
                  <div className="absolute inset-0 z-0">
                    <Waves   
                      lineColor="#10b981"
                      backgroundColor="rgba(0, 0, 0, 0)"
                      waveSpeedX={0.02}
                      waveSpeedY={0.04}
                      waveAmpX={50}
                      waveAmpY={10}
                      friction={0.9}
                      tension={0.01}
                      maxCursorMove={90}
                      xGap={12}
                      yGap={36}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                }
              />
              
              <HowItWorksBlocks 
                text='CONTRIBUTE <br /> CONTENT'
                className="border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-400 group backdrop-blur-sm"
                children={
                  <div className="absolute inset-0 z-0">
                    <Waves   
                      lineColor="#06b6d4"
                      backgroundColor="rgba(0, 0, 0, 0)"
                      waveSpeedX={0.03}
                      waveSpeedY={0.05}
                      waveAmpX={40}
                      waveAmpY={15}
                      friction={0.85}
                      tension={0.02}
                      maxCursorMove={80}
                      xGap={14}
                      yGap={30}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                }
              />
              
              <HowItWorksBlocks 
                text='EARN <br /> REWARDS'
                className="border-amber-500/30 bg-amber-500/5 hover:border-amber-400 group backdrop-blur-sm"
                children={
                  <div className="absolute inset-0 z-0">
                    <Waves   
                      lineColor="#f59e0b"
                      backgroundColor="rgba(0, 0, 0, 0)"
                      waveSpeedX={0.04}
                      waveSpeedY={0.03}
                      waveAmpX={45}
                      waveAmpY={12}
                      friction={0.92}
                      tension={0.015}
                      maxCursorMove={70}
                      xGap={16}
                      yGap={32}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                }
              />
            </div>

          </div>
        </div>
      </section>

      {/* Core Roles Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <Badge
                variant="outline"
                className="mb-6 py-1.5 px-4 border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
              >
                For Everyone
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Core Platform Roles
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Our ecosystem thrives with two key participants working together
                to create value.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <Button
                variant="outline"
                asChild
                className="rounded-full py-6 px-8 border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 text-base"
              >
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
                  "Receive performance bonuses for viral content",
                ],
                image: "/img/coffee-2.png",
                color: "from-emerald-400 to-cyan-400",
                bgColor: "bg-emerald-500/10",
              },
              {
                role: "Campaign Creator",
                desc: "Brands, DAOs, or influencers who launch campaigns to promote specific topics or products with defined metrics.",
                features: [
                  "Create targeted content campaigns",
                  "Pay only for quality content that delivers",
                  "Access detailed analytics dashboards",
                  "Staked tokens ensure accountability",
                ],
                image: "/img/coffee-1.png",
                color: "from-amber-400 to-orange-400",
                bgColor: "bg-amber-500/10",
              },
            ].map((role, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/72 to-gray-800/72 rounded-3xl blur-[20px] opacity-0 group-hover:opacity-80 transition-all duration-700 -z-10"></div>
                <Card
                  className={`p-1 ${role.bgColor} rounded-3xl hover:shadow-[0_0_25px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden border-none`}
                >
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
                        <h3
                          className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${role.color}`}
                        >
                          {role.role}
                        </h3>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-gray-400 mb-6">{role.desc}</p>
                      <ul className="space-y-3 mb-6">
                        {role.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle
                              className={`h-5 w-5 mr-3 mt-0.5 text-transparent bg-clip-text bg-gradient-to-r ${role.color}`}
                            />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        asChild
                        variant="outline"
                        className={`w-full rounded-full mt-4 border-gray-800 hover:bg-${role.bgColor} hover:border-${role.borderColor} transition-all duration-300`}
                      >
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
                    Join thousands of writers already earning crypto rewards for
                    their content. Create an account today and start browsing
                    campaigns that match your expertise.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      asChild
                      className="rounded-full py-6 px-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-720 hover:to-cyan-720 border-0 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 text-base"
                    >
                      <Link href="/apps/account/register">
                        Create Free Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full py-6 px-8 border-gray-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 text-base"
                    >
                      <Link href="/apps">Browse Campaigns</Link>
                    </Button>
                  </div>
                </div>
                <div className="lg:w-1/3 relative">
                  <div className="relative w-72 h-72 md:w-72 md:h-72">
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
              <Image
                src="/img/logo.png"
                alt="WriteToEarn"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
              <p className="text-sm text-gray-500 mt-2">
                © 2025 Write-to-Earn. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/docs"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
