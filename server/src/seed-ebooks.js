const mongoose = require('mongoose');
const Ebook = require('./models/Ebook.model'); // Adjust path as needed

async function seedEbooks() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing ebooks (optional - remove if you want to keep existing data)
    await Ebook.deleteMany({});
    console.log('🗑️ Cleared existing ebooks');

    // Create test ebook
    const testEbook = new Ebook({
      title: "Suicide Note",
      slug: "suicide-note-2026",
      author: "Loba Yusuf",
      description: "A powerful Nigerian fiction exploring mental health, depression, and the journey to healing through community and connection in Lagos, Nigeria.",
      shortDescription: "A raw, honest portrayal of depression and hope in modern Nigeria.",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewContent: `CHAPTER ONE: THE NOTE BEGINS\n\nI'm writing this because I need someone to understand. Not my mother, who will cry and ask what she did wrong. Not my father, who will wonder where he failed as a man...`,
      fullContent: `[Full book content here - all 10 chapters]\n\nCHAPTER ONE: THE NOTE BEGINS\n\nI'm writing this because I need someone to understand...\n\n[Content continues for all chapters]`,
      price: 2500,
      discountPrice: null,
      currency: "NGN",
      category: "mental-health",
      tags: ["fiction", "mental-health", "nigeria", "depression", "hope", "healing"],
      chapters: [
        {
          title: "Chapter 1: The Note Begins",
          content: "I'm writing this because I need someone to understand...",
          pageCount: 15,
          estimatedReadingTime: 30
        },
        {
          title: "Chapter 2: Lagos at Dawn",
          content: "The thing about Lagos is, you can be surrounded by twenty million people and still drown in loneliness...",
          pageCount: 18,
          estimatedReadingTime: 35
        },
        // Add more chapters as needed
      ],
      language: "English",
      publisher: "Self-published",
      publishedDate: new Date("2024-01-01"),
      ratings: {
        average: 4.9,
        count: 127,
        distribution: {
          1: 0,
          2: 1,
          3: 3,
          4: 15,
          5: 108
        }
      },
      salesCount: 127,
      affiliateCommissionRate: 0.5,
      isPublished: true,
      isFeatured: true,
      metadata: {
        keywords: ["mental health", "depression", "Nigeria", "fiction", "healing"],
        ogImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
        twitterCard: "summary_large_image"
      }
    });

    await testEbook.save();
    console.log('✅ Test ebook created:', {
      id: testEbook._id,
      title: testEbook.title,
      slug: testEbook.slug,
      price: testEbook.price
    });

    // Create a second ebook for testing variety
    const secondEbook = new Ebook({
      title: "Journey Through Darkness",
      slug: "journey-through-darkness",
      author: "Loba Yusuf",
      description: "Another powerful story about overcoming adversity and finding light in the darkest moments.",
      shortDescription: "Finding hope when all seems lost.",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      previewContent: "It was the darkest night of my life...",
      fullContent: "[Full content of second ebook]",
      price: 3000,
      currency: "NGN",
      category: "fiction",
      tags: ["hope", "recovery", "inspiration"],
      isPublished: true,
      affiliateCommissionRate: 0.4
    });

    await secondEbook.save();
    console.log('✅ Second ebook created:', secondEbook.slug);

    console.log('🎉 Database seeded successfully!');
    console.log(`📚 Total ebooks: ${await Ebook.countDocuments()}`);

    mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedEbooks();