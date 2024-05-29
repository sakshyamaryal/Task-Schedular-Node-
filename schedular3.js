/**
 * housekeeping of record more than 180 days
 */
const cron =  require("node-cron");

const fs = require("fs");
const path = require("path");

const archive = require("./data/archive.json")

const houseKeepingTask = (() => {
    console.log("Running house keeping invoices task : ", new Date());
    try {

        archive.map((item, index) => {
            const presentDate = new Date().getTime();
            const recordDate = new Date(item.date).getTime();
            console.log("Number of days : ", Math.floor(presentDate-recordDate) / (1000 * 60 * 60));
            if (Math.floor(presentDate-recordDate) / (1000 * 60 * 60) > 180) {
             archive.splice(index,1);
             fs.writeFileSync(
                path.join(__dirname, "./", "data", "archive.json"),
                JSON.stringify(archive),
                "utf-8"
                );
            }
        })


        
    } catch (error) {
        console.log("error", error);
    }
    console.log("house keepingtask ended");
})

cron.schedule("* * * * * *", houseKeepingTask);
