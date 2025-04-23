import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { join } from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import formidable from 'formidable';

// This is needed for formidable to handle file uploads in Next.js App Router
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Process and save an uploaded image
 * @param {Buffer} buffer - The image data buffer
 * @returns {Promise<string|null>} - The public URL of the saved image or null
 */
async function processImage(buffer) {
  try {
    if (!buffer) return null;

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const fileName = `${uuidv4()}.webp`;
    const outputPath = join(uploadDir, fileName);

    // Process image with sharp
    await sharp(buffer)
      .resize(1200, 630, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Return the public URL
    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}

/**
 * Handle POST request for campaign creation
 * @param {Request} request - The incoming request object 
 */
export async function POST(request) {
  try {
    // Clone the request to avoid consuming it
    const clonedRequest = request.clone();
    
    // Get the content type to determine how to parse the body
    const contentType = request.headers.get('content-type') || '';
    
    // Initialize variables
    let formData;
    let coverImagePath = null;
    let fieldValues = {};
    
    // Handle multipart form data (for file uploads)
    if (contentType.includes('multipart/form-data')) {
      formData = await clonedRequest.formData();
      
      // Extract file and convert it to buffer if it exists
      const coverImageFile = formData.get('coverImage');
      if (coverImageFile && coverImageFile instanceof File) {
        const buffer = Buffer.from(await coverImageFile.arrayBuffer());
        coverImagePath = await processImage(buffer);
      }
      
      // Extract other form fields
      formData.forEach((value, key) => {
        if (key !== 'coverImage') {
          try {
            // Try to parse JSON values (for dates and objects)
            fieldValues[key] = JSON.parse(value);
          } catch {
            // If not valid JSON, use as-is
            fieldValues[key] = value;
          }
        }
      });
    } else {
      // Handle regular JSON if not multipart
      const jsonData = await request.json();
      fieldValues = jsonData;
    }
    
    // Log the received data
    console.log("Campaign data received:", fieldValues);
    
    // Get or create a user (for demonstration purposes - in production you'd use auth)
    let user = await prisma.user.findFirst();
    
    // If no user exists, create a demo user
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Demo User",
          email: "demo@example.com",
          walletAddress: "0x1234567890123456789012345678901234567890",
        },
      });
      console.log("Created demo user:", user.id);
    }
    
    // Prepare the data structure for database insertion
    const dbCampaignData = {
      title: fieldValues.title,
      description: fieldValues.description,
      startDate: new Date(fieldValues.startDate),
      endDate: new Date(fieldValues.endDate),
      keywords: fieldValues.keywords,
      targetAudience: fieldValues.targetAudience || null,
      aiDescription: fieldValues.aiDescription || null,
      CtaGoal: fieldValues.ctaGoal || null,
      ownerId: user.id, // Use the existing or newly created user ID
      campaginAddress: fieldValues.campaignAddress || null,
      coverImage: coverImagePath, // Add the image path
    };
    
    // Save to database with Prisma
    const savedCampaign = await prisma.campaign.create({
      data: dbCampaignData,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            walletAddress: true,
          },
        },
      },
    });
    
    // Return a successful response
    return NextResponse.json({ 
      success: true, 
      message: "Campaign created successfully",
      campaign: savedCampaign
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating campaign:", error);
    
    // Return an error response
    return NextResponse.json({ 
      success: false, 
      message: "Failed to create campaign", 
      error: error.message 
    }, { status: 500 });
  }
}