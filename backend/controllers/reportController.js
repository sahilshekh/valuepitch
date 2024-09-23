// controllers/reportController.js
const Operation = require('../models/Opration');

// Helper function to calculate success/error metrics
const calculateMetrics = async (startDate, endDate) => {
  const totalOperations = await Operation.countDocuments({
    createdAt: { $gte: startDate, $lt: endDate },
  });
  
  const successOperations = await Operation.countDocuments({
    status: 'success',
    createdAt: { $gte: startDate, $lt: endDate },
  });

  const errorOperations = await Operation.countDocuments({
    status: 'error',
    createdAt: { $gte: startDate, $lt: endDate },
  });

  const errorCategories = await Operation.aggregate([
    { $match: { status: 'error', createdAt: { $gte: startDate, $lt: endDate } } },
    { $group: { _id: '$errorMessage', count: { $sum: 1 } } },
  ]);

  return {
    totalOperations,
    successOperations,
    errorOperations,
    successRate: (successOperations / totalOperations) * 100,
    errorRate: (errorOperations / totalOperations) * 100,
    errorCategories,
  };
};

// Controller to handle report generation
const generateMISReport = async (req, res) => {
  try {
    const timeFrame = req.query.timeFrame || 'daily'; // 'daily', 'weekly', 'monthly'
    
    let startDate;
    const endDate = new Date(); // Now

    // Set start date based on time frame
    switch (timeFrame) {
      case 'weekly':
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'monthly':
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'daily':
      default:
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 1);
    }

    // Calculate metrics
    const metrics = await calculateMetrics(startDate, endDate);

    res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating report',
      error: error.message,
    });
  }
};

module.exports = {
  generateMISReport,
};
