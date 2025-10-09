import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'No image URL provided' },
        { status: 400 }
      );
    }

    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch image' },
        { status: 500 }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Return the image as a downloadable file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="smol-pfp.png"',
        'Content-Length': buffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to download image' },
      { status: 500 }
    );
  }
}
