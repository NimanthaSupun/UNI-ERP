import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Code,
  Users,
  Clock,
  Star,
  CheckCircle,
  Loader,
  ArrowLeft,
} from "lucide-react";

const ResearchMentoringPanel = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    researchPathway: -1, // Index of selected pathway (0-17)
    projectType: -1, // Index of selected project type (0-2)
    programmingSkills: [0, 0, 0, 0], // 4 categories levels (0-100)
    industryInterests: [0, 0, 0, 0], // 4 industry levels (0-100)
    timeCommitment: -1, // Index of selected time commitment (0-2)
  });
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedTopics, setRecommendedTopics] = useState([]);

  const totalSteps = 5;

  // 18 Research Pathways (indices 0-17)
  const researchPathways = [
    "Artificial Intelligence & Machine Learning",
    "Data Science & Analytics",
    "Web Development",
    "Mobile Application Development",
    "Cybersecurity",
    "Cloud Computing & DevOps",
    "Internet of Things (IoT)",
    "Embedded Systems",
    "Game Development",
    "Human-Computer Interaction / UI-UX",
    "Software Engineering",
    "Networking & Communication",
    "Robotics & Automation",
    "Blockchain & Web3",
    "Tech Ethics & Policy",
    "Business/Enterprise Systems",
    "Health Informatics",
    "Augmented/Virtual Reality",
  ];

  // 3 Project Types (indices 18-20)
  const projectTypes = [
    {
      value: "Project",
      label: "Technical Project",
      desc: "System/Software Development",
      icon: Code,
    },
    {
      value: "Research",
      label: "Research Paper",
      desc: "Academic Research & Analysis",
      icon: BookOpen,
    },
    {
      value: "researchproject",
      label: "Research Project",
      desc: "Combined Research & Development",
      icon: Users,
    },
  ];

  // 4 Programming Categories (indices 21-24)
  const programmingCategories = [
    "General Purpose & System Programming",
    "Web & App Development",
    "Data Science, ML & Math",
    "Scripting & DevOps",
  ];

  const programmingLanguagesByCategory = {
    "General Purpose & System Programming": [
      "C",
      "C++",
      "Rust",
      "Go",
      "Java",
      "C#",
    ],
    "Web & App Development": [
      "JavaScript",
      "TypeScript",
      "PHP",
      "Kotlin (Android)",
      "Swift (iOS)",
      "Dart (Flutter)",
    ],
    "Data Science, ML & Math": ["Python", "R", "MATLAB", "SQL"],
    "Scripting & DevOps": [
      "Shell/Bash",
      "Ruby",
      "PowerShell",
      "Docker",
      "Kubernetes",
    ],
  };

  // 4 Industry Categories (indices 25-28)
  const industryCategories = [
    "Human-Centered Services",
    "Business, Finance & Commerce",
    "Infrastructure, Logistics & Energy",
    "Governance, Security & Advanced Tech",
  ];

  // 3 Time Commitment Options (indices 29-31)
  const timeCommitmentOptions = [
    "Basic (2-3 months, low resource)",
    "Moderate (4-6 months, medium resource)",
    "Extensive (6+ months, high resource)",
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Construct the 32-element array for the model
    const modelInput = [];

    // First 18 elements: Research pathways (one-hot encoding) - indices 0-17
    for (let i = 0; i < 18; i++) {
      modelInput.push(formData.researchPathway === i ? 1 : 0);
    }

    // Next 3 elements: Project types (one-hot encoding) - indices 18-20
    for (let i = 0; i < 3; i++) {
      modelInput.push(formData.projectType === i ? 1 : 0);
    }

    // Next 4 elements: Programming skills levels (0-1 range) - indices 21-24
    modelInput.push(...formData.programmingSkills.map((skill) => skill / 100));

    // Next 4 elements: Industry interests levels (0-1 range) - indices 25-28
    modelInput.push(
      ...formData.industryInterests.map((interest) => interest / 100)
    );

    // Last 3 elements: Time commitment (one-hot encoding) - indices 29-31
    for (let i = 0; i < 3; i++) {
      modelInput.push(formData.timeCommitment === i ? 1 : 0);
    }

    console.log("Model Input Array (32 features):", modelInput);
    console.log("Array length:", modelInput.length);

    try {
      const response = await fetch("http://localhost:5000/getresult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: modelInput,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setRecommendedTopics(result.recommendations || []);
        setShowResults(true);
      } else {
        console.error("Error from server:", response.statusText);
        // Fallback to demo topics
        // setRecommendedTopics([
        //   'Artificial Intelligence & Data Science',
        //   'Frontend Web & UI/UX Design',
        //   'Internet of Things (IoT) & Embedded Systems'
        // ]);
        setRecommendedTopics([
          { topic: "Cloud Computing & DevOps", confidence: 89.1 },
          { topic: "Business Data Analytics & Visualization", confidence: 5.9 },
          { topic: "Artificial Intelligence & Data Science", confidence: 3.4 },
        ]);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Fallback to demo topics
      // setRecommendedTopics([
      //   "Artificial Intelligence & Data Science",
      //   "Frontend Web & UI/UX Design",
      //   "Internet of Things (IoT) & Embedded Systems",
      // ]);
      setRecommendedTopics([
        { topic: "Cloud Computing & DevOps", confidence: 89.1 },
        { topic: "Business Data Analytics & Visualization", confidence: 5.9 },
        { topic: "Artificial Intelligence & Data Science", confidence: 3.4 },
      ]);
      setShowResults(true);
    }

    setIsLoading(false);
  };

  const updateProgrammingSkill = (index, value) => {
    const newSkills = [...formData.programmingSkills];
    newSkills[index] = value;
    setFormData((prev) => ({
      ...prev,
      programmingSkills: newSkills,
    }));
  };

  const updateIndustryInterest = (index, value) => {
    const newInterests = [...formData.industryInterests];
    newInterests[index] = value;
    setFormData((prev) => ({
      ...prev,
      industryInterests: newInterests,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Analyzing Your Preferences
          </h2>
          <p className="text-gray-600">
            Our AI is finding the perfect research topics for you...
          </p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Your Recommended Research Topics
              </h1>
              <p className="text-gray-600">
                Based on your preferences and our AI analysis
              </p>
            </div>

            <div className="grid gap-6">
              {recommendedTopics.map((rec, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-800 mb-1">
                        {rec.topic}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Confidence:{" "}
                        <span className="font-medium text-blue-600">
                          {rec.confidence}%
                        </span>
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                          style={{ width: `${rec.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-3xl ml-4">
                      {index === 0 ? "🏆" : index === 1 ? "🥈" : "🥉"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentStep(1);
                  setFormData({
                    researchPathway: -1,
                    projectType: -1,
                    programmingSkills: [0, 0, 0, 0],
                    industryInterests: [0, 0, 0, 0],
                    timeCommitment: -1,
                  });
                }}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium"
              >
                Take Assessment Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-400 via-blue-400 to-indigo-400">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Research Topic Recommendation
            </h1>
            <p className="text-gray-600 mb-7">
              Help us understand your interests to suggest the perfect research
              topic
            </p>

            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center hover:text-blue-600 mb-2 transition-colors text-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2"/>
              Back to Dashboard
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Step 1: Research Pathway */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Select Your Preferred Research Pathway
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose the research area that interests you most (select only
                  one)
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {researchPathways.map((pathway, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.researchPathway === index
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="researchPathway"
                        value={index}
                        checked={formData.researchPathway === index}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            researchPathway: parseInt(e.target.value),
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          formData.researchPathway === index
                            ? "bg-green-600 border-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.researchPathway === index && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="text-gray-700">{pathway}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Project Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Project Type Preference
                </h2>
                <p className="text-gray-600 mb-6">
                  What type of project would you prefer? (select only one)
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {projectTypes.map((option, index) => (
                    <label
                      key={index}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 text-center ${
                        formData.projectType === index
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value={index}
                        checked={formData.projectType === index}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectType: parseInt(e.target.value),
                          })
                        }
                        className="sr-only"
                      />
                      <option.icon
                        className={`w-12 h-12 mx-auto mb-3 ${
                          formData.projectType === index
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Programming Skills */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Rate Your Programming Proficiency
                </h2>
                <p className="text-gray-600 mb-6">
                  Rate your skill level in each programming category (0-100%).
                  You can rate all categories.
                </p>

                <div className="space-y-6">
                  {programmingCategories.map((category, index) => (
                    <div key={category} className="bg-gray-50 p-6 rounded-lg">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                          <Code className="w-5 h-5 mr-2 text-green-600" />
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {programmingLanguagesByCategory[category].map(
                            (lang) => (
                              <span
                                key={lang}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                              >
                                {lang}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-gray-700">
                          Proficiency Level
                        </label>
                        <span className="text-sm font-semibold text-green-600">
                          {formData.programmingSkills[index]}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.programmingSkills[index]}
                        onChange={(e) =>
                          updateProgrammingSkill(
                            index,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #10b981 0%, #10b981 ${formData.programmingSkills[index]}%, #d1d5db ${formData.programmingSkills[index]}%, #d1d5db 100%)`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Industry Interests */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Industry Interest Level
                </h2>
                <p className="text-gray-600 mb-6">
                  Rate your interest in these industry sectors (0-100%). You can
                  rate all sectors.
                </p>

                <div className="space-y-6">
                  {industryCategories.map((category, index) => (
                    <div key={category} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">
                          {category}
                        </h3>
                        <span className="text-sm font-semibold text-blue-600">
                          {formData.industryInterests[index]}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.industryInterests[index]}
                        onChange={(e) =>
                          updateIndustryInterest(
                            index,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${formData.industryInterests[index]}%, #d1d5db ${formData.industryInterests[index]}%, #d1d5db 100%)`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Time Commitment */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Project Time & Resource Commitment
                </h2>
                <p className="text-gray-600 mb-6">
                  What level of time and resources can you commit? (select only
                  one)
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {timeCommitmentOptions.map((option, index) => {
                    const details = [
                      {
                        title: "Basic",
                        duration: "2-3 months",
                        resource: "Low resource",
                        icon: "🚀",
                        desc: "Perfect for getting started with focused scope",
                      },
                      {
                        title: "Moderate",
                        duration: "4-6 months",
                        resource: "Medium resource",
                        icon: "⚡",
                        desc: "Balanced approach with comprehensive outcomes",
                      },
                      {
                        title: "Extensive",
                        duration: "6+ months",
                        resource: "High resource",
                        icon: "🏆",
                        desc: "Deep dive research with significant impact",
                      },
                    ];

                    return (
                      <label
                        key={index}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.timeCommitment === index
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeCommitment"
                          value={index}
                          checked={formData.timeCommitment === index}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timeCommitment: parseInt(e.target.value),
                            })
                          }
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-3xl mb-3">
                            {details[index].icon}
                          </div>
                          <h3 className="font-bold text-lg text-gray-800 mb-2">
                            {details[index].title}
                          </h3>
                          <div className="space-y-1 mb-3">
                            <p className="text-sm font-medium text-gray-600">
                              {details[index].duration}
                            </p>
                            <p className="text-sm text-gray-500">
                              {details[index].resource}
                            </p>
                          </div>
                          <p className="text-xs text-gray-600">
                            {details[index].desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i + 1 <= currentStep ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={currentStep === totalSteps ? handleSubmit : handleNext}
                disabled={
                  (currentStep === 1 && formData.researchPathway === -1) ||
                  (currentStep === 2 && formData.projectType === -1) ||
                  (currentStep === 5 && formData.timeCommitment === -1)
                }
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  (currentStep === 1 && formData.researchPathway === -1) ||
                  (currentStep === 2 && formData.projectType === -1) ||
                  (currentStep === 5 && formData.timeCommitment === -1)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
                }`}
              >
                {currentStep === totalSteps ? "Get AI Recommendations" : "Next"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchMentoringPanel;
