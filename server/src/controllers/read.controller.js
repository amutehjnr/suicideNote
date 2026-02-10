const AccessCode = require('../models/AccessCode.model');
const Ebook = require('../models/Ebook.model');
const User = require('../models/User.model');
const winston = require('winston');

const readController = {
  // Get reading session data
  async getReadingSession(req, res) {
    try {
      const { ebookId } = req.params;
      const userId = req.user._id;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get ebook data
      const ebook = await Ebook.findById(ebookId)
        .select('title author chapters totalPages estimatedReadingTime');
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      // Get user's reading progress
      const user = await User.findById(userId);
      let readingProgress = null;
      
      if (user.readingProgress && user.readingProgress.ebookId.toString() === ebookId) {
        readingProgress = user.readingProgress;
      }
      
      // Increment access count
      await accessCode.incrementAccess({
        device: req.headers['user-agent'],
        ipAddress: req.ip,
      });
      
      return res.status(200).json({
        success: true,
        data: {
          ebook: {
            id: ebook._id,
            title: ebook.title,
            author: ebook.author,
            chapters: ebook.chapters,
            totalPages: ebook.totalPages,
            estimatedReadingTime: ebook.estimatedReadingTime,
          },
          accessCode: {
            code: accessCode.code,
            expiresAt: accessCode.expiresAt,
            accessCount: accessCode.accessCount,
            lastAccessedAt: accessCode.lastAccessedAt,
          },
          readingProgress,
          sessionStartedAt: new Date(),
        },
      });
    } catch (error) {
      winston.error('Get reading session error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to start reading session',
      });
    }
  },

  // Get ebook chapter
  async getChapter(req, res) {
    try {
      const { ebookId, chapterIndex } = req.params;
      const userId = req.user._id;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get ebook
      const ebook = await Ebook.findById(ebookId);
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      // Check if chapter exists
      const chapterIndexNum = parseInt(chapterIndex);
      
      if (chapterIndexNum < 0 || chapterIndexNum >= ebook.chapters.length) {
        return res.status(404).json({
          success: false,
          error: 'Chapter not found',
        });
      }
      
      const chapter = ebook.chapters[chapterIndexNum];
      
      // Get adjacent chapters for navigation
      const prevChapter = chapterIndexNum > 0 ? ebook.chapters[chapterIndexNum - 1] : null;
      const nextChapter = chapterIndexNum < ebook.chapters.length - 1 
        ? ebook.chapters[chapterIndexNum + 1] 
        : null;
      
      return res.status(200).json({
        success: true,
        data: {
          chapter: {
            index: chapterIndexNum,
            title: chapter.title,
            content: chapter.content,
            pageCount: chapter.pageCount,
            estimatedReadingTime: chapter.estimatedReadingTime,
          },
          navigation: {
            prev: prevChapter ? {
              index: chapterIndexNum - 1,
              title: prevChapter.title,
            } : null,
            next: nextChapter ? {
              index: chapterIndexNum + 1,
              title: nextChapter.title,
            } : null,
            totalChapters: ebook.chapters.length,
            currentChapter: chapterIndexNum + 1,
          },
          ebook: {
            id: ebook._id,
            title: ebook.title,
            author: ebook.author,
          },
        },
      });
    } catch (error) {
      winston.error('Get chapter error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch chapter',
      });
    }
  },

  // Save reading position
  async saveReadingPosition(req, res) {
    try {
      const { ebookId } = req.params;
      const { chapterIndex, position, percentComplete } = req.body;
      const userId = req.user._id;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get ebook to validate chapter index
      const ebook = await Ebook.findById(ebookId);
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      // Validate chapter index
      if (chapterIndex < 0 || chapterIndex >= ebook.chapters.length) {
        return res.status(400).json({
          success: false,
          error: 'Invalid chapter index',
        });
      }
      
      // Calculate last page based on position
      const chapter = ebook.chapters[chapterIndex];
      const wordsPerPage = 300; // Average words per page
      const words = chapter.content.split(/\s+/).length;
      const totalPagesInChapter = Math.ceil(words / wordsPerPage);
      const currentPage = Math.floor((position / 100) * totalPagesInChapter);
      
      // Calculate total page in ebook
      let totalPage = 0;
      for (let i = 0; i < chapterIndex; i++) {
        totalPage += ebook.chapters[i].pageCount || Math.ceil(ebook.chapters[i].content.split(/\s+/).length / wordsPerPage);
      }
      totalPage += currentPage + 1; // +1 because pages are 1-indexed
      
      // Save reading progress
      await User.findByIdAndUpdate(userId, {
        $set: {
          readingProgress: {
            ebookId,
            lastChapter: chapter.title,
            chapterIndex,
            position,
            percentComplete,
            currentPage,
            totalPage,
            lastReadAt: new Date(),
          },
        },
      });
      
      // Update last accessed time for access code
      accessCode.lastAccessedAt = new Date();
      await accessCode.save();
      
      return res.status(200).json({
        success: true,
        message: 'Reading position saved',
        data: {
          chapterIndex,
          position,
          percentComplete,
          currentPage,
          totalPage,
          lastReadAt: new Date(),
        },
      });
    } catch (error) {
      winston.error('Save reading position error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to save reading position',
      });
    }
  },

  // Get reading statistics
  async getReadingStats(req, res) {
    try {
      const { ebookId } = req.params;
      const userId = req.user._id;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get user's reading progress
      const user = await User.findById(userId);
      const ebook = await Ebook.findById(ebookId);
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      let readingProgress = null;
      let readingTime = 0;
      let averageReadingSpeed = 0;
      
      if (user.readingProgress && user.readingProgress.ebookId.toString() === ebookId) {
        readingProgress = user.readingProgress;
        
        // Calculate estimated reading time based on progress
        if (readingProgress.percentComplete && ebook.estimatedReadingTime) {
          readingTime = Math.floor((readingProgress.percentComplete / 100) * ebook.estimatedReadingTime);
        }
        
        // Calculate average reading speed (words per minute)
        if (accessCode.lastAccessedAt && accessCode.createdAt) {
          const totalReadingTime = (accessCode.lastAccessedAt - accessCode.createdAt) / (1000 * 60); // minutes
          if (totalReadingTime > 0) {
            const totalWords = ebook.fullContent.split(/\s+/).length;
            averageReadingSpeed = Math.floor(totalWords / totalReadingTime);
          }
        }
      }
      
      const stats = {
        accessCount: accessCode.accessCount,
        firstAccessed: accessCode.createdAt,
        lastAccessed: accessCode.lastAccessedAt,
        expiresAt: accessCode.expiresAt,
        readingProgress,
        estimatedTotalReadingTime: ebook.estimatedReadingTime,
        estimatedTimeSpent: readingTime,
        averageReadingSpeed,
        chaptersCompleted: readingProgress ? Math.floor((readingProgress.percentComplete / 100) * ebook.chapters.length) : 0,
        totalChapters: ebook.chapters.length,
      };
      
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      winston.error('Get reading stats error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch reading statistics',
      });
    }
  },

  // Search within ebook
  async searchInEbook(req, res) {
    try {
      const { ebookId } = req.params;
      const { query } = req.query;
      const userId = req.user._id;
      
      if (!query || query.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Search query must be at least 2 characters',
        });
      }
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get ebook
      const ebook = await Ebook.findById(ebookId);
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      // Search in ebook content
      const searchResults = [];
      const searchRegex = new RegExp(query, 'gi');
      
      ebook.chapters.forEach((chapter, chapterIndex) => {
        const matches = [...chapter.content.matchAll(searchRegex)];
        
        matches.forEach(match => {
          // Get context around the match
          const matchIndex = match.index;
          const contextStart = Math.max(0, matchIndex - 100);
          const contextEnd = Math.min(chapter.content.length, matchIndex + match[0].length + 100);
          const context = chapter.content.substring(contextStart, contextEnd);
          
          // Highlight the match in context
          const highlightedContext = context.replace(
            searchRegex,
            match => `<mark>${match}</mark>`
          );
          
          // Calculate approximate position in chapter (percentage)
          const positionInChapter = (matchIndex / chapter.content.length) * 100;
          
          searchResults.push({
            chapterIndex,
            chapterTitle: chapter.title,
            match: match[0],
            context: highlightedContext,
            positionInChapter,
            characterPosition: matchIndex,
          });
        });
      });
      
      // Limit results
      const limitedResults = searchResults.slice(0, 50);
      
      return res.status(200).json({
        success: true,
        data: {
          query,
          totalResults: searchResults.length,
          results: limitedResults,
          ebook: {
            id: ebook._id,
            title: ebook.title,
            totalChapters: ebook.chapters.length,
          },
        },
      });
    } catch (error) {
      winston.error('Search in ebook error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to search in ebook',
      });
    }
  },

  // Get ebook table of contents
  async getTableOfContents(req, res) {
    try {
      const { ebookId } = req.params;
      const userId = req.user._id;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get ebook
      const ebook = await Ebook.findById(ebookId)
        .select('title author chapters');
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      // Format table of contents
      const toc = ebook.chapters.map((chapter, index) => ({
        index,
        title: chapter.title,
        pageCount: chapter.pageCount || 0,
        estimatedReadingTime: chapter.estimatedReadingTime || 0,
      }));
      
      // Get user's reading progress for current chapter
      const user = await User.findById(userId);
      let currentChapterIndex = -1;
      
      if (user.readingProgress && user.readingProgress.ebookId.toString() === ebookId) {
        currentChapterIndex = user.readingProgress.chapterIndex || -1;
      }
      
      return res.status(200).json({
        success: true,
        data: {
          ebook: {
            id: ebook._id,
            title: ebook.title,
            author: ebook.author,
            totalChapters: ebook.chapters.length,
          },
          tableOfContents: toc,
          currentChapterIndex,
          accessCode: accessCode.code,
        },
      });
    } catch (error) {
      winston.error('Get table of contents error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch table of contents',
      });
    }
  },

  // Add bookmark
  async addBookmark(req, res) {
    try {
      const { ebookId } = req.params;
      const { chapterIndex, note, color } = req.body;
      const userId = req.user._id;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get ebook to validate chapter index
      const ebook = await Ebook.findById(ebookId);
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      // Validate chapter index
      if (chapterIndex < 0 || chapterIndex >= ebook.chapters.length) {
        return res.status(400).json({
          success: false,
          error: 'Invalid chapter index',
        });
      }
      
      // Add bookmark to user
      const user = await User.findById(userId);
      
      if (!user.bookmarks) {
        user.bookmarks = [];
      }
      
      // Check if bookmark already exists for this position
      const existingBookmarkIndex = user.bookmarks.findIndex(
        bookmark => 
          bookmark.ebookId.toString() === ebookId && 
          bookmark.chapterIndex === chapterIndex
      );
      
      const bookmarkData = {
        ebookId,
        chapterIndex,
        note: note || '',
        color: color || 'yellow',
        createdAt: new Date(),
      };
      
      if (existingBookmarkIndex > -1) {
        // Update existing bookmark
        user.bookmarks[existingBookmarkIndex] = bookmarkData;
      } else {
        // Add new bookmark
        user.bookmarks.push(bookmarkData);
      }
      
      await user.save();
      
      return res.status(200).json({
        success: true,
        message: existingBookmarkIndex > -1 ? 'Bookmark updated' : 'Bookmark added',
        data: bookmarkData,
      });
    } catch (error) {
      winston.error('Add bookmark error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to add bookmark',
      });
    }
  },

  // Get bookmarks
  async getBookmarks(req, res) {
    try {
      const { ebookId } = req.params;
      const userId = req.user._id;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get user with bookmarks
      const user = await User.findById(userId)
        .select('bookmarks');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      
      // Filter bookmarks for this ebook
      const bookmarks = user.bookmarks.filter(
        bookmark => bookmark.ebookId.toString() === ebookId
      );
      
      // Get ebook for chapter titles
      const ebook = await Ebook.findById(ebookId)
        .select('chapters.title');
      
      // Enrich bookmarks with chapter titles
      const enrichedBookmarks = bookmarks.map(bookmark => ({
        ...bookmark.toObject(),
        chapterTitle: ebook.chapters[bookmark.chapterIndex]?.title || 'Unknown Chapter',
      }));
      
      return res.status(200).json({
        success: true,
        data: {
          bookmarks: enrichedBookmarks,
          total: enrichedBookmarks.length,
        },
      });
    } catch (error) {
      winston.error('Get bookmarks error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch bookmarks',
      });
    }
  },

  // Remove bookmark
  async removeBookmark(req, res) {
    try {
      const { ebookId, bookmarkId } = req.params;
      const userId = req.user._id;
      
      // Get user
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        });
      }
      
      // Find and remove bookmark
      const bookmarkIndex = user.bookmarks.findIndex(
        bookmark => 
          bookmark._id.toString() === bookmarkId && 
          bookmark.ebookId.toString() === ebookId
      );
      
      if (bookmarkIndex === -1) {
        return res.status(404).json({
          success: false,
          error: 'Bookmark not found',
        });
      }
      
      user.bookmarks.splice(bookmarkIndex, 1);
      await user.save();
      
      return res.status(200).json({
        success: true,
        message: 'Bookmark removed',
      });
    } catch (error) {
      winston.error('Remove bookmark error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to remove bookmark',
      });
    }
  },

  // Export ebook highlights (for personal use)
  async exportHighlights(req, res) {
    try {
      const { ebookId } = req.params;
      const userId = req.user._id;
      const { format = 'txt' } = req.query;
      
      // Check if user has access
      const accessCode = await AccessCode.findOne({
        user: userId,
        ebook: ebookId,
        isActive: true,
      });
      
      if (!accessCode || !accessCode.isValid()) {
        return res.status(403).json({
          success: false,
          error: 'You do not have access to this ebook',
        });
      }
      
      // Get ebook
      const ebook = await Ebook.findById(ebookId)
        .select('title author');
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      // Get user's bookmarks
      const user = await User.findById(userId)
        .select('bookmarks');
      
      const bookmarks = user.bookmarks.filter(
        bookmark => bookmark.ebookId.toString() === ebookId
      );
      
      // Format export based on requested format
      let exportContent = '';
      let filename = '';
      let contentType = '';
      
      switch (format.toLowerCase()) {
        case 'txt':
          exportContent = `Highlights from "${ebook.title}" by ${ebook.author}\n\n`;
          exportContent += `Exported on: ${new Date().toLocaleDateString()}\n\n`;
          exportContent += '='.repeat(50) + '\n\n';
          
          bookmarks.forEach((bookmark, index) => {
            exportContent += `Highlight ${index + 1}:\n`;
            exportContent += `Chapter: ${bookmark.chapterIndex + 1}\n`;
            exportContent += `Note: ${bookmark.note || '(No note)'}\n`;
            exportContent += `Date: ${new Date(bookmark.createdAt).toLocaleDateString()}\n`;
            exportContent += '-'.repeat(30) + '\n\n';
          });
          
          filename = `highlights-${ebook.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
          contentType = 'text/plain';
          break;
          
        case 'json':
          exportContent = JSON.stringify({
            ebook: {
              title: ebook.title,
              author: ebook.author,
            },
            exportedAt: new Date().toISOString(),
            highlights: bookmarks.map(bookmark => ({
              chapterIndex: bookmark.chapterIndex,
              note: bookmark.note,
              color: bookmark.color,
              createdAt: bookmark.createdAt,
            })),
          }, null, 2);
          
          filename = `highlights-${ebook.title.replace(/\s+/g, '-').toLowerCase()}.json`;
          contentType = 'application/json';
          break;
          
        case 'pdf':
          // In production, you would use a PDF generation library like pdfkit
          exportContent = 'PDF export would be generated here in production.';
          filename = `highlights-${ebook.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
          contentType = 'application/pdf';
          break;
          
        default:
          return res.status(400).json({
            success: false,
            error: 'Unsupported export format. Use: txt, json, or pdf',
          });
      }
      
      // Set headers for file download
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      
      return res.send(exportContent);
    } catch (error) {
      winston.error('Export highlights error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to export highlights',
      });
    }
  },

  // Validate reading access
  async validateAccess(req, res) {
    try {
      const { ebookId } = req.params;
      const userId = req.user._id;
      const { code } = req.query;
      
      let hasAccess = false;
      let accessCode = null;
      
      // Check via user's access codes
      if (userId) {
        accessCode = await AccessCode.findOne({
          user: userId,
          ebook: ebookId,
          isActive: true,
        });
        
        if (accessCode && accessCode.isValid()) {
          hasAccess = true;
        }
      }
      
      // Check via direct code
      if (!hasAccess && code) {
        accessCode = await AccessCode.findOne({
          code: code.toUpperCase(),
          ebook: ebookId,
          isActive: true,
        });
        
        if (accessCode && accessCode.isValid()) {
          hasAccess = true;
        }
      }
      
      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          error: 'Access denied',
        });
      }
      
      // Get ebook info
      const ebook = await Ebook.findById(ebookId)
        .select('title author coverImage');
      
      if (!ebook) {
        return res.status(404).json({
          success: false,
          error: 'Ebook not found',
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          hasAccess: true,
          ebook: {
            id: ebook._id,
            title: ebook.title,
            author: ebook.author,
            coverImage: ebook.coverImage,
          },
          accessCode: accessCode.code,
          expiresAt: accessCode.expiresAt,
        },
      });
    } catch (error) {
      winston.error('Validate access error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to validate access',
      });
    }
  },
};

module.exports = readController;