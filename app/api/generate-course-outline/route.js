import { inngest } from "/inngest/client";
import { courseOutlineAIModel } from "/configs/AiModel";
import { db } from "/configs/db";
import { STUDY_MATERIAL_TABLE } from "/configs/schema";
import { NextResponse } from "next/server";
import service from "../../../configs/service";  // Fix import

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      await req.json();


    const PROMPT = `Generate a study material with course title for ${topic} for ${courseType} and level of difficulty will be ${difficultyLevel} with summary of course, List of Chapters along with summary and Emoji icon for each chapter, Topic list in each chapter in JSON format`;

    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);


    const aiResult = JSON.parse(aiResp.response.text());


    const chaptersWithVideos = await Promise.all(
      aiResult.chapters.map(async (chapter) => {
        let videoId = '';
        try {
          const videos = await service.getVideos(`${topic}: ${chapter.chapterTitle}`); // Use chapterTitle instead of title

          videoId = videos[0]?.id?.videoId || '';

        } catch (err) {
          console.log(`Error fetching video for chapter ${chapter.chapterTitle}:`, err);
        }
        return { ...chapter, videoId };
      })
    );

    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId,
        courseType,
        createdBy,
        topic,
        courseLayout: { ...aiResult, chapters: chaptersWithVideos }, // Ensure the AI response contains 'courseLayout'
      })
      .returning();


    const result = await inngest.send({
      name: "notes.generate",
      data: {
        course: dbResult[0], // Adjusting for the correct returned object structure
      },
    });

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
