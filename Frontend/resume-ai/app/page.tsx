"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Download, 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  Wand2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
  Layers,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("edit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"checking" | "connected" | "offline">("checking");
  const [themeColor, setThemeColor] = useState<"indigo" | "emerald" | "violet" | "rose">("indigo");

  // Resume State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Alex Morgan",
    jobTitle: "Senior Full Stack Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "alexmorgan.dev",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
  });

  const [summary, setSummary] = useState(
    "Passionate Senior Full Stack Engineer with 6+ years of experience crafting high-performance web applications, scalable Node.js microservices, and modern React interfaces. Adept at driving cloud architecture, mentoring engineering teams, and delivering user-centric AI software products."
  );

  const [skills, setSkills] = useState<string[]>([
    "TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Docker", "REST APIs", "GraphQL"
  ]);
  const [newSkill, setNewSkill] = useState("");

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      company: "Nexus AI Tech",
      role: "Lead Full Stack Developer",
      location: "San Francisco, CA",
      duration: "2022 - Present",
      description: "Engineered scalable Node.js backend services serving 500k+ monthly active users. Reduced API latency by 35% through Redis caching and PostgreSQL indexing.",
    },
    {
      id: "2",
      company: "CloudScale Systems",
      role: "Software Engineer",
      location: "Austin, TX",
      duration: "2020 - 2022",
      description: "Developed responsive React component libraries and Next.js applications. Integrated CI/CD pipelines reducing deployment time by 40%.",
    }
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      year: "2016 - 2020",
    }
  ]);

  // Check Node.js Backend Server Status
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("http://localhost:5000/");
        if (res.ok) {
          setBackendStatus("connected");
        } else {
          setBackendStatus("offline");
        }
      } catch (err) {
        setBackendStatus("offline");
      }
    };
    checkBackend();
  }, []);

  // Generate AI Summary via Node.js Backend API
  const handleAiGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      if (backendStatus === "connected") {
        const res = await fetch("http://localhost:5000/api/generate-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: personalInfo.fullName,
            role: personalInfo.jobTitle,
            skills: skills,
          }),
        });

        const data = await res.json();
        if (data.success && data.data?.summary) {
          setSummary(data.data.summary);
        }
      } else {
        // High quality fallback generation if local backend server is starting
        setSummary(
          `Results-driven ${personalInfo.jobTitle} specializing in building scalable web architectures and intelligent cloud services. Proficient in ${skills.slice(0, 4).join(", ")}. Proven track record of accelerating product delivery and engineering high-impact features.`
        );
      }
    } catch (error) {
      console.error("AI Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        company: "Company Name",
        role: "Job Title",
        location: "Location",
        duration: "2023 - Present",
        description: "Key achievement or responsibility details...",
      },
    ]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(
      experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        institution: "University / Institute",
        degree: "Degree / Certification",
        year: "2018 - 2022",
      },
    ]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(
      educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const colorThemes = {
    indigo: "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 header-gradient-indigo",
    emerald: "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 header-gradient-emerald",
    violet: "border-violet-600 bg-violet-600 text-white hover:bg-violet-700 header-gradient-violet",
    rose: "border-rose-600 bg-rose-600 text-white hover:bg-rose-700 header-gradient-rose",
  };

  const headerColors = {
    indigo: "bg-indigo-900 text-white",
    emerald: "bg-emerald-900 text-white",
    violet: "bg-violet-900 text-white",
    rose: "bg-rose-900 text-white",
  };

  const accentTextColors = {
    indigo: "text-indigo-600 dark:text-indigo-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
    violet: "text-violet-600 dark:text-violet-400",
    rose: "text-rose-600 dark:text-rose-400",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-white tracking-tight">Autom8 Resume AI</h1>
              <p className="text-xs text-slate-400">Next.js + Node.js Powered Builder</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Node.js Backend Status Pill */}
            <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900">
              <span className="text-slate-400">Node API:</span>
              {backendStatus === "checking" && (
                <span className="flex items-center gap-1 text-amber-400">
                  <RefreshCw className="h-3 w-3 animate-spin" /> Checking
                </span>
              )}
              {backendStatus === "connected" && (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> localhost:5000 Online
                </span>
              )}
              {backendStatus === "offline" && (
                <span className="flex items-center gap-1 text-slate-400">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400" /> Offline (Fallback Active)
                </span>
              )}
            </div>

            <Button
              onClick={() => window.print()}
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200"
            >
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Column */}
        <div className="lg:col-span-6 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-4 bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <TabsTrigger value="personal" className="text-xs sm:text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <User className="h-4 w-4 mr-1.5 hidden sm:inline" /> Info
              </TabsTrigger>
              <TabsTrigger value="experience" className="text-xs sm:text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <Briefcase className="h-4 w-4 mr-1.5 hidden sm:inline" /> Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="text-xs sm:text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <Wand2 className="h-4 w-4 mr-1.5 hidden sm:inline" /> Skills
              </TabsTrigger>
              <TabsTrigger value="education" className="text-xs sm:text-sm data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <GraduationCap className="h-4 w-4 mr-1.5 hidden sm:inline" /> Education
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal">
              <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Personal Details</span>
                    <Button 
                      onClick={handleAiGenerateSummary}
                      disabled={isGenerating}
                      size="sm"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-md"
                    >
                      {isGenerating ? (
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      {isGenerating ? "Generating..." : "AI Generate Summary"}
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Enter your contact information and professional overview.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Full Name</Label>
                      <Input
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Target Job Title</Label>
                      <Input
                        value={personalInfo.jobTitle}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, jobTitle: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Email Address</Label>
                      <Input
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Phone</Label>
                      <Input
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Location</Label>
                      <Input
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">LinkedIn URL</Label>
                      <Input
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                        className="bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-slate-300">Professional Summary</Label>
                    </div>
                    <Textarea
                      rows={4}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      className="bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500 leading-relaxed"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Work Experience Tab */}
            <TabsContent value="experience">
              <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Work Experience</CardTitle>
                    <CardDescription className="text-slate-400">
                      Add your previous jobs and achievements.
                    </CardDescription>
                  </div>
                  <Button onClick={addExperience} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-1" /> Add Position
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative group">
                      <Button
                        onClick={() => removeExperience(exp.id)}
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 hover:bg-slate-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                        <div>
                          <Label className="text-xs text-slate-400">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-9"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-slate-400">Role / Title</Label>
                          <Input
                            value={exp.role}
                            onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-9"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-slate-400">Duration</Label>
                          <Input
                            value={exp.duration}
                            onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-9"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-slate-400">Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-9"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-slate-400">Achievements / Bullet Points</Label>
                        <Textarea
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          className="bg-slate-900 border-slate-800 text-slate-100 text-sm mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Skills & Technologies</CardTitle>
                  <CardDescription className="text-slate-400">
                    Add key skills relevant to your target role.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. Next.js, Docker, Python..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      className="bg-slate-950 border-slate-800 text-slate-100"
                    />
                    <Button onClick={addSkill} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-slate-950 border border-slate-800 hover:border-indigo-500 text-slate-200 px-3 py-1.5 text-xs flex items-center gap-1.5"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-slate-400 hover:text-red-400 ml-1"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="bg-slate-900 border-slate-800 text-slate-100 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Education & Certifications</CardTitle>
                    <CardDescription className="text-slate-400">
                      Academic degrees and relevant training.
                    </CardDescription>
                  </div>
                  <Button onClick={addEducation} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-1" /> Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative">
                      <Button
                        onClick={() => removeEducation(edu.id)}
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 hover:bg-slate-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                        <div>
                          <Label className="text-xs text-slate-400">Institution / University</Label>
                          <Input
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-9"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-slate-400">Degree / Program</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-9"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label className="text-xs text-slate-400">Year / Duration</Label>
                          <Input
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                            className="bg-slate-900 border-slate-800 text-slate-100 h-9"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Theme Palette Bar */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Palette className="h-4 w-4 text-indigo-400" />
              <span>Resume Accent Theme:</span>
            </div>
            <div className="flex gap-2">
              {(["indigo", "emerald", "violet", "rose"] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setThemeColor(color)}
                  className={`h-7 w-7 rounded-full transition-all ${
                    color === "indigo"
                      ? "bg-indigo-600"
                      : color === "emerald"
                      ? "bg-emerald-600"
                      : color === "violet"
                      ? "bg-violet-600"
                      : "bg-rose-600"
                  } ${themeColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110" : "opacity-70 hover:opacity-100"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Resume Preview Column */}
        <div className="lg:col-span-6">
          <div className="sticky top-20 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4" /> Live Document Preview
              </h2>
              <span className="text-xs text-slate-500">Updates dynamically</span>
            </div>

            {/* A4 Paper Mockup Container */}
            <div className="bg-white text-slate-900 rounded-xl shadow-2xl p-8 min-h-[750px] border border-slate-200 flex flex-col justify-between overflow-hidden relative">
              {/* Top Colored Accent Stripe */}
              <div 
                className={`absolute top-0 left-0 right-0 h-3 ${
                  themeColor === "indigo"
                    ? "bg-indigo-600"
                    : themeColor === "emerald"
                    ? "bg-emerald-600"
                    : themeColor === "violet"
                    ? "bg-violet-600"
                    : "bg-rose-600"
                }`}
              />

              <div className="space-y-6 pt-2">
                {/* Header Info */}
                <div className="border-b border-slate-200 pb-5">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {personalInfo.fullName || "Your Name"}
                  </h1>
                  <p className={`text-lg font-semibold mt-1 ${accentTextColors[themeColor]}`}>
                    {personalInfo.jobTitle || "Professional Title"}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
                    {personalInfo.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> {personalInfo.email}
                      </span>
                    )}
                    {personalInfo.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-slate-400" /> {personalInfo.phone}
                      </span>
                    )}
                    {personalInfo.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" /> {personalInfo.location}
                      </span>
                    )}
                    {personalInfo.linkedin && (
                      <span className="flex items-center gap-1">
                        <LinkIcon className="h-3.5 w-3.5 text-slate-400" /> {personalInfo.linkedin}
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary Section */}
                {summary && (
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Professional Overview
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {summary}
                    </p>
                  </div>
                )}

                {/* Experience Section */}
                {experiences.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                      Work Experience
                    </h3>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="space-y-1">
                          <div className="flex items-baseline justify-between">
                            <span className="font-bold text-sm text-slate-900">{exp.role}</span>
                            <span className="text-xs font-medium text-slate-500">{exp.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                            <span>{exp.company}</span>
                            <span>{exp.location}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pt-1">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                      Skills & Technical Expertise
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education Section */}
                {educations.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                      Education
                    </h3>
                    <div className="space-y-2">
                      {educations.map((edu) => (
                        <div key={edu.id} className="flex justify-between items-baseline text-xs">
                          <div>
                            <span className="font-bold text-slate-900">{edu.degree}</span>
                            <span className="text-slate-600 block">{edu.institution}</span>
                          </div>
                          <span className="text-slate-500 font-medium">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Watermark / Footer */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>Generated with Autom8 Resume AI</span>
                <span>Page 1 of 1</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
