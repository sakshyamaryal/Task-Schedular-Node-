const cron =  require("node-cron");

const task = () => {
    console.log("running a scheduled task at : ", new Date());
}

cron.schedule("* * * * *", task);