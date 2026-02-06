"use client";

import { useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { AddProjectInDB } from "@/db/addproject";
import { POST } from "@/app/api/explore/route";

export default function AddProject() {
  const [formData, setFormData] = useState({
    title: "",
    oneLiner: "",
    description: "",
    badges: "n8n",
    code:"",
    screenshots: [] as string[]
  });

  const [currentBadge, setCurrentBadge] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setFormData(prev => ({
              ...prev,
              screenshots: [...prev.screenshots, ...newImages]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImages.push(reader.result as string);
            if (newImages.length === files.length) {
              setFormData(prev => ({
                ...prev,
                screenshots: [...prev.screenshots, ...newImages]
              }));
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  // Handle submit
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.title || !formData.oneLiner || !formData.description || !formData.code || !formData.screenshots)
      return alert("Empty values are not allowed , Please fill it.")
    console.log("Form Data:", formData);
    const response = await fetch("/api/userprojects" , {
      method:"POST",
      body:JSON.stringify(formData),
      headers:{
        "Content-Type":"application/json"
      },
    })
    if(response.ok)
      console.log("sucess")
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3 mt-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Project</h1>
          <p className="text-gray-600">Share your automation with the community</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Project Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., Twitter Trend Scraper"
              className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* One-Line Solution */}
          <div className="mb-6">
            <label htmlFor="oneLiner" className="block text-lg font-semibold text-gray-700 mb-2">
              One-Line Solution *
            </label>
            <input
              type="text"
              id="oneLiner"
              name="oneLiner"
              value={formData.oneLiner}
              onChange={handleInputChange}
              required
              placeholder="e.g., Scrapes trending tweets and saves to Google Sheets"
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.oneLiner.length}/100 characters</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Describe your project in detail. What problem does it solve? How does it work? What technologies did you use?"
              className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.description.length} characters</p>
          </div>

          {/* Json code */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
              Json Code *
            </label>
            <textarea
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Drop your project here!!!"
              className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.code.length} characters</p>
          </div>


          {/* Tech Stack Badges */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Tech Stack / Tools <span className="animate-pulse duration pl-1 font-bold">(*will provide other options in future updates!!*)</span>
            </label>
            <Badge className="w-15 text-lg font-normal">n8n</Badge>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Project Screenshots *
            </label>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <input
                type="file"
                id="screenshots"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="screenshots" className="cursor-pointer">
                <Upload className="size-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-gray-800">PNG, JPG up to 10MB</p>
              </label>
            </div>

            {/* Image Preview Grid */}
            {formData.screenshots.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Uploaded Images ({formData.screenshots.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.screenshots.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="size-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                          Main Image
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          {(formData.title || formData.oneLiner || formData.screenshots.length > 0) && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preview</h3>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {formData.screenshots.length > 0 && (
                  <img
                    src={formData.screenshots[0]}
                    alt="Preview"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="font-bold text-xl mb-2">{formData.title || "Project Title"}</h4>
                  <p className="text-sm text-gray-600 mb-3">{formData.oneLiner || "One-line solution"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Publish Project
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}