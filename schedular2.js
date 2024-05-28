/** 
 * job to check the status of invoices and 
 * if status is paid we archive the record
 * 
 * 
 */
const cron =  require("node-cron");

const fs = require("fs");
const path = require("path");


const invoices =  require("./data/invoice.json")

const archiveInvoicesTask =  () => {
    console.log("running arcive inocies task : ", new Date());
    try {

        const paidInvoices =  invoices.filter((item) => {
            return item.status === "Paid";
        });

        if (paidInvoices.length > 0) {
            paidInvoices.forEach((item) => {
                invoices.splice(invoices.findIndex((e) => 
                    e.status === item.status
                ),1)
            })

            console.log("the  inovices are", invoices);
            fs.writeFileSync(
                path.join(__dirname, "./", "data", "invoice.json"),
                JSON.stringify(invoices),
                "utf-8"
            );
            fs.writeFileSync(
                path.join(__dirname, "./", "data", "archive.json"),
                JSON.stringify(paidInvoices),
                "utf-8"
            );
        }

    } catch (error) {
        console.log("error : ",error);
    }
    console.log("taskended");
};

cron.schedule("*/30* * * * *", archiveInvoicesTask);
