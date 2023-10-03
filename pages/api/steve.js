export default async (req, res) => {
    const calendarId = "c_e7c63a427761b0f300ede97f432ba4af24033daad26be86da0551b40b7968f00@group.calendar.google.com";
    const apiKey = "AIzaSyD_8dEnTDle3WmaoOTvEW6L1GW540FU_wg"; // Replace with your API Key

    let allBusyDays = new Set();

    try {
        const currentDateTime = new Date();
        const adjustedDateTime = new Date(currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() + 240) * 60 * 1000); // Adjust to GMT-04
        const startTime = adjustedDateTime.toISOString();
        const endTime = new Date(adjustedDateTime.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

        const response = await fetch(`https://www.googleapis.com/calendar/v3/freeBusy?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeMin: startTime,
                timeMax: endTime,
                items: [{ id: calendarId }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        // Assuming there are time ranges where the calendar is busy:
        const busyTimes = data.calendars[calendarId].busy;

        // For each busy time range, extract all days that are busy:
        for (let busy of busyTimes) {
            let startDate = new Date(busy.start);
            let endDate = new Date(busy.end);

            // Adjust dates to GMT-04
            startDate = new Date(startDate.getTime() + (startDate.getTimezoneOffset() + 240) * 60 * 1000);
            endDate = new Date(endDate.getTime() + (endDate.getTimezoneOffset() + 240) * 60 * 1000);

            while (startDate < endDate) {
                allBusyDays.add(startDate.toISOString().split('T')[0]);
                startDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // Adding 24 hours for the next date
            }
        }

        return res.status(200).json([...allBusyDays]);

    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch busy times." });
    }
};
