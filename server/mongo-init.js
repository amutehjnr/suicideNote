db.createUser({
  user: "admin",
  pwd: "admin123",
  roles: [
    {
      role: "readWrite",
      db: "ebook_db"
    }
  ]
});

// Create indexes
db = db.getSiblingDB('ebook_db');

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });

db.ebooks.createIndex({ slug: 1 }, { unique: true });
db.ebooks.createIndex({ isPublished: 1 });

db.purchases.createIndex({ userId: 1 });
db.purchases.createIndex({ transactionReference: 1 }, { unique: true });
db.purchases.createIndex({ status: 1 });
db.purchases.createIndex({ createdAt: 1 });

db.affiliates.createIndex({ userId: 1 }, { unique: true });
db.affiliates.createIndex({ affiliateCode: 1 }, { unique: true });
db.affiliates.createIndex({ totalEarnings: 1 });

db.accesscodes.createIndex({ code: 1 }, { unique: true });
db.accesscodes.createIndex({ userId: 1 });
db.accesscodes.createIndex({ expiresAt: 1 });