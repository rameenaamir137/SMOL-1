import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Debug information
    console.log('File details:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });

    // Check if file is empty
    if (file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'Uploaded file is empty' },
        { status: 400 }
      );
    }

    // Convert file to base64 for OpenAI API
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Check if buffer is empty
    if (buffer.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Uploaded file is empty or corrupted' },
        { status: 400 }
      );
    }

    // Convert to base64 data URL
    const base64Image = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    // First, analyze the uploaded image to understand what character we're working with
    const imageAnalysis = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in detail, focusing on the character's appearance, clothing, accessories, and any distinctive features. Be specific about colors, style, and any unique elements that should be preserved in a pixel art version. Keep it concise but descriptive."
            },
            {
              type: "image_url",
              image_url: {
                url: dataUrl
              }
            }
          ]
        }
      ],
      max_tokens: 200
    });

    const characterDescription = imageAnalysis.choices[0]?.message?.content || "a character";

    // Use DALL-E 3 to generate a completely new pixel art character from the description
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a small pixel art character based on this description: "${characterDescription}". Transform this into a retro 8-bit pixel art character. The character should be centered on a flat solid orange background (#FA8947). Make it look like classic 32-bit pixel art with simple, blocky proportions. The figure should be very small, occupying only about 20% of the canvas height, positioned exactly in the middle. Keep all recognizable features but make them extremely simplified and pixelated. The style should be minimalistic and low-resolution, similar to old video game sprites. No shadows, gradients, realistic details, or extra background elements. Pure pixel art aesthetic with orange background.`,
      n: 1,
      size: "1024x1024",
      style: "vivid",
      quality: "standard"
    });

    if (response.data && response.data[0]?.url) {
      return NextResponse.json({
        success: true,
        imageUrl: response.data[0].url,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to generate image' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error generating image:', error);

    // Handle specific OpenAI errors
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'insufficient_quota') {
        return NextResponse.json(
          { success: false, error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      if (error.code === 'invalid_api_key') {
        return NextResponse.json(
          { success: false, error: 'Invalid API key configuration.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'An error occurred while generating the image' },
      { status: 500 }
    );
  }
}
