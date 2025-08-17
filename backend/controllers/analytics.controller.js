import { getAnalyticsData, getDailySalesData } from "../services/analytics.service.js"

const analyticsController = async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date()
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const dailySalesData = await getDailySalesData(startDate, endDate)

        res.json({
            analyticsData,
            dailySalesData
        })

    } catch (error) {
        console.log("Error in Analytics Controller \n", error)
        res.json(500).json({ message: "Server Error", error: error.message })
    }
}


export default analyticsController