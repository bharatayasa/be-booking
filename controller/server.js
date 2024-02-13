module.exports = {
    server: async (req, res) => {
        try {
            return res.status(200).json({
                message: "server up and running"
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }
}
