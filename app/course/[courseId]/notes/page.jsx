"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import VideoPlayer from "../_components/VideoPlayer";
import Link from "next/link";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stepCount, setStepCount] = useState(0);
 
  const prevStep = () => stepCount > 0 && setStepCount(stepCount - 1);
  const nextStep = () =>
    stepCount < notes.length - 1 && setStepCount(stepCount + 1);

  useEffect(() => {
    if (courseId) {
      fetchNotes();
    }
  }, [courseId]);

  const fetchNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      setNotes(result.data);
    } catch (err) {
      console.error("Error fetching notes:", err.message);
      setError("Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center text-blue-500">Loading notes...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  let jsonObject = null;
  try {
    if (!notes || !notes[stepCount] || !notes[stepCount].notes) {
      throw new Error("Invalid notes data");
    }
    const jsonString = notes[stepCount].notes;
    jsonObject = JSON.parse(jsonString);
  } catch (err) {
    console.error("Error parsing JSON:", err.message);
    return (
      <div className="text-center text-red-500"> 
        Error: Failed to parse notes data.
      </div>
    );
  }

  const videoId = notes[stepCount]?.videoId;

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Top Progress + Navigation */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <Link href={`/course/${courseId}`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition">
            Material Section
          </button>
        </Link>
  
        <button
          onClick={prevStep}
          disabled={stepCount === 0 || notes.length === 0}
          className="px-4 py-2 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-500 hover:text-white transition disabled:opacity-50"
        >
          Previous
        </button>
  
        {/* Progress Indicator */}
      <div className="flex flex-1 gap-2">
        {notes.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index <= stepCount ? "bg-indigo-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
        </div>
  
        <button
          onClick={nextStep}
          disabled={stepCount === notes.length - 1 || notes.length === 0}
          className="px-4 py-2 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-500 hover:text-white transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
  
      {/* Main Content */}
      {jsonObject && (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Video Section */}
          {videoId && (
            <div className="w-full lg:w-1/2 sticky top-24 h-fit">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Chapter Video</h3>
              <VideoPlayer videoId={videoId} />
            </div>
          )}
  
          {/* Notes Section */}
          <div className="w-full lg:w-1/2">
            {/* Chapter Title */}
            <div className="flex items-center text-2xl md:text-3xl font-bold mb-6">
              <span className="pr-3">{jsonObject.emoji}</span>
              {jsonObject.chapterTitle}
            </div>
  
            {/* Chapter Summary */}
            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
              {jsonObject.chapterSummary}
            </p>
  
            {/* Topics */}
            <div className="space-y-8">
              {jsonObject.topics.map((topic, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-blue-500 mb-4">
                    {topic.topicTitle}
                  </h2>
  
                  <div className="prose prose-blue max-w-none text-gray-700">
                    <ReactMarkdown
                      children={topic.content}
                      remarkPlugins={[remarkGfm]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
}
export default ViewNotes;
