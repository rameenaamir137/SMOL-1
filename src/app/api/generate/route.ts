import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Dynamic import for Sharp to handle platform-specific issues
let sharp: any;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('Sharp import error:', error);
}

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

    // Convert file to PNG format for OpenAI API compatibility
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Check if buffer is empty
    if (buffer.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Uploaded file is empty or corrupted' },
        { status: 400 }
      );
    }
    
    // Convert any image format to PNG with RGBA format for OpenAI API compatibility
    let pngBuffer: Buffer;
    try {
      if (!sharp) {
        throw new Error('Sharp module not available');
      }
      
      pngBuffer = await sharp(buffer)
        .ensureAlpha() // Ensure alpha channel is present
        .png()
        .toBuffer();
    } catch (sharpError) {
      console.error('Sharp processing error:', sharpError);
      
      // Fallback: try to use the original buffer if Sharp fails
      if (file.type === 'image/png') {
        pngBuffer = buffer;
      } else {
        return NextResponse.json(
          { success: false, error: 'Image processing service temporarily unavailable. Please try uploading a PNG file or try again later.' },
          { status: 500 }
        );
      }
    }

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
                url: `data:image/png;base64,${Buffer.from(pngBuffer).toString('base64')}`
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
