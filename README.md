# Projectjs
#Project for javascript programming
Product.aggregate([
      {
        $group: {
          _id: "$CompanyID",
          totalStock: { $sum: "$StockQuantity" },
        },
      },
      {
        $project: {
          CompanyID: "$_id",
          CompanyQuantity: "$totalStock",
          _id: 0,
        },
      },
    ]);