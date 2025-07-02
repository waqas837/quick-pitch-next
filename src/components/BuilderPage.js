"use client";

import { useState, useRef } from "react";
import {
  Download,
  Rocket,
  Target,
  Lightbulb,
  Users,
  DollarSign,
  Zap,
  Megaphone,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function BuilderPage() {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    problem: "",
    solution: "",
    market: "",
    revenue: "",
    edge: "",
    callToAction: "",
  });

  const previewRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const exportPDF = () => {
    if (previewRef.current) {
      // Create a temporary element with the PDF content
      const element = document.createElement("div");
      element.innerHTML = previewRef.current.innerHTML;
      element.style.width = "8.5in";
      element.style.padding = "0.75in";
      element.style.backgroundColor = "white";
      element.style.fontFamily = "Arial, sans-serif";
      element.style.fontSize = "12px";
      element.style.lineHeight = "1.4";

      // Configure PDF options
      const opt = {
        margin: 0.5,
        filename: `${form.name || "startup-pitch"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Generate PDF (simulated for demo - in real app, html2pdf library would be used)
      // html2pdf().set(opt).from(element).save();

      // For demo purposes, create a downloadable HTML file
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${form.name || "Startup Pitch"}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background: white; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; }
                .company-name { font-size: 28px; font-weight: bold; color: #4f46e5; margin-bottom: 10px; }
                .tagline { font-size: 16px; font-style: italic; color: #666; background: #f8fafc; padding: 15px; border-radius: 8px; }
                .section { margin-bottom: 25px; page-break-inside: avoid; }
                .section-title { font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 8px; border-left: 4px solid #4f46e5; padding-left: 12px; }
                .section-content { color: #374151; line-height: 1.6; margin-left: 16px; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">${
                  form.name || "Your Startup Name"
                }</div>
                <div class="tagline">"${
                  form.tagline || "Your compelling tagline goes here"
                }"</div>
            </div>
            
            <div class="grid">
                <div class="section">
                    <div class="section-title">🔍 The Problem</div>
                    <div class="section-content">${
                      form.problem || "Problem description goes here..."
                    }</div>
                </div>
                
                <div class="section">
                    <div class="section-title">💡 Our Solution</div>
                    <div class="section-content">${
                      form.solution || "Solution description goes here..."
                    }</div>
                </div>
                
                <div class="section">
                    <div class="section-title">🎯 Target Market</div>
                    <div class="section-content">${
                      form.market || "Target market description goes here..."
                    }</div>
                </div>
                
                <div class="section">
                    <div class="section-title">💰 Revenue Model</div>
                    <div class="section-content">${
                      form.revenue || "Revenue model description goes here..."
                    }</div>
                </div>
                
                <div class="section">
                    <div class="section-title">⚡ Competitive Edge</div>
                    <div class="section-content">${
                      form.edge || "Competitive advantage goes here..."
                    }</div>
                </div>
                
                <div class="section">
                    <div class="section-title">📢 Call to Action</div>
                    <div class="section-content">${
                      form.callToAction || "Call to action goes here..."
                    }</div>
                </div>
            </div>
            
            <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                Generated with PitchCraft - Professional Startup Pitch Builder
            </div>
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.name || "startup-pitch"}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const fieldProgress = Object.values(form).filter(
    (value) => value.trim() !== ""
  ).length;
  const totalFields = Object.keys(form).length;
  const progressPercentage = (fieldProgress / totalFields) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  PitchCraft
                </h1>
                <p className="text-sm text-gray-500">
                  Professional Startup Pitch Builder
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Sparkles className="w-4 h-4" />
                <span>
                  {fieldProgress}/{totalFields} completed
                </span>
              </div>
              <button
                onClick={exportPDF}
                disabled={fieldProgress === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 gap-8">
        {/* Form Section */}
        <div className="space-y-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-indigo-600" />
              Build Your Pitch
            </h2>

            <div className="space-y-6">
              <Input
                label="Startup Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your startup name..."
                icon={<Rocket className="w-5 h-5" />}
              />

              <Input
                label="One-Liner / Tagline"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="Describe your startup in one compelling sentence..."
                icon={<Sparkles className="w-5 h-5" />}
              />

              <Textarea
                label="Problem"
                name="problem"
                value={form.problem}
                onChange={handleChange}
                placeholder="What problem are you solving? Be specific about the pain points..."
                icon={<Search className="w-5 h-5" />}
              />

              <Textarea
                label="Solution"
                name="solution"
                value={form.solution}
                onChange={handleChange}
                placeholder="How does your product/service solve this problem..."
                icon={<Lightbulb className="w-5 h-5" />}
              />

              <Textarea
                label="Target Market"
                name="market"
                value={form.market}
                onChange={handleChange}
                placeholder="Who are your customers? Define your target audience..."
                icon={<Target className="w-5 h-5" />}
              />

              <Textarea
                label="Revenue Model"
                name="revenue"
                value={form.revenue}
                onChange={handleChange}
                placeholder="How will you make money? Describe your monetization strategy..."
                icon={<DollarSign className="w-5 h-5" />}
              />

              <Textarea
                label="Competitive Edge"
                name="edge"
                value={form.edge}
                onChange={handleChange}
                placeholder="What makes you different from competitors..."
                icon={<Zap className="w-5 h-5" />}
              />

              <Textarea
                label="Call to Action"
                name="callToAction"
                value={form.callToAction}
                onChange={handleChange}
                placeholder="What do you want from investors/partners..."
                icon={<Megaphone className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              Live Preview
            </h2>

            <div
              ref={previewRef}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 print:shadow-none print:border-none"
            >
              <ProfessionalPitchDocument {...form} />
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Pro Tips
            </h3>
            <ul className="text-sm text-indigo-700 space-y-2">
              <li>• Keep your tagline under 15 words for maximum impact</li>
              <li>• Use specific numbers and metrics in your market section</li>
              <li>• Focus on customer pain points, not just features</li>
              <li>• Make your call-to-action clear and actionable</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, icon }) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <span className="text-indigo-600 mr-2">{icon}</span>
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:bg-white/80"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, placeholder, icon }) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <span className="text-indigo-600 mr-2">{icon}</span>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm group-hover:bg-white/80 resize-none"
      />
    </div>
  );
}

function ProfessionalPitchDocument({
  name,
  tagline,
  problem,
  solution,
  market,
  revenue,
  edge,
  callToAction,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed">
      {/* Header Section */}
      <div className="text-center mb-8 pb-6 border-b-2 border-indigo-600">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-indigo-700 mb-3 tracking-tight">
            {name || "Your Startup Name"}
          </h1>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200">
            <p className="text-lg text-gray-700 italic font-medium">
              "
              {tagline ||
                "Your transformative one-liner that captures your vision"}
              "
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-4">
          Executive Summary & Business Overview
        </div>
      </div>

      {/* Executive Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Problem Section */}
        <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <h2 className="text-lg font-bold text-red-700">Market Problem</h2>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
            {problem || (
              <div className="italic text-gray-500">
                Describe the specific problem your startup addresses. Include
                market pain points, current limitations, and why this problem
                matters to your target audience.
              </div>
            )}
          </div>
        </div>

        {/* Solution Section */}
        <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <h2 className="text-lg font-bold text-yellow-700">Our Solution</h2>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
            {solution || (
              <div className="italic text-gray-500">
                Detail your innovative solution. Explain how your
                product/service directly addresses the identified problem and
                creates value for customers.
              </div>
            )}
          </div>
        </div>

        {/* Market Section */}
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <h2 className="text-lg font-bold text-green-700">Target Market</h2>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
            {market || (
              <div className="italic text-gray-500">
                Define your target audience, market size, and customer segments.
                Include demographics, psychographics, and market opportunity
                analysis.
              </div>
            )}
          </div>
        </div>

        {/* Revenue Section */}
        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <h2 className="text-lg font-bold text-blue-700">Revenue Model</h2>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
            {revenue || (
              <div className="italic text-gray-500">
                Outline your monetization strategy, pricing model, revenue
                streams, and financial projections. Show how you'll generate
                sustainable income.
              </div>
            )}
          </div>
        </div>

        {/* Competitive Edge Section */}
        <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">5</span>
            </div>
            <h2 className="text-lg font-bold text-purple-700">
              Competitive Advantage
            </h2>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
            {edge || (
              <div className="italic text-gray-500">
                Highlight what sets you apart from competitors. Include unique
                value propositions, proprietary technology, or strategic
                advantages.
              </div>
            )}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-pink-50 rounded-lg p-6 border-l-4 border-pink-500">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">6</span>
            </div>
            <h2 className="text-lg font-bold text-pink-700">Next Steps</h2>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
            {callToAction || (
              <div className="italic text-gray-500">
                Specify what you're seeking from investors, partners, or
                stakeholders. Include funding requirements, partnership
                opportunities, or strategic asks.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information Placeholder */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 text-center">
        <h3 className="font-bold text-gray-800 mb-2">
          Creator Of This Tool - Contact Information
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>I am a Web developer,</p>
          <p>📧 Email: waqas@trendcraftx.com</p>
          <p>📱 WhatsApp: +92 320 5858954</p>
          <Link
            href="https://trendcraftx.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            🌐 Website: trendcraftx.com
          </Link>
        </div>
        <br />
        <h3 className="font-bold text-gray-800 mb-2">
          Thanks for using this free tool. ❤️
        </h3>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          Generated with PitchCraft - Professional Startup Pitch Builder
        </p>
      </div>
    </div>
  );
}
