const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0M1UHJFZFhNRVlPZm4welBTMUw4TTBVNG02Ukp6T0NWUGorQmN2UTJXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDBxMkFVYms5YUwyNVNWMmRJSjEvenRqdms2UlRyVWpNR2FPU0FTajBGZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3T1NMVlI0ZXZrdXdnaCs0a1dwSlEyTHc5dnlRYjZCdWpVRFc2YWJic1h3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4Ri85UHZtN1AwbWRXVkxwWk0vQjlHcFU3SDVDSGJIWkY0dWQrb3c0TFEwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitHdnZINnNOVGxUSktzRlZJcDJxT0tubHExS2M1SFNHL2NseVBjSXlOV2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlIyczNBZlRxTEpYTjVaKzFhazVuOXJ4TFlLRWFqWWRjVmg1UG5RTmFnSEk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVA4OGV4amYwSXdjbVFURURlaHdtaGcrZy9WSU9kRVZuWC9NeEdIMGtuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXE5QXp5MUdDc1ZneUlXMFNmSlhqWFI2RTQ1UGI5UE1GQjRydGFrZ2hXZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRZdVk2eWxQR2RUQzllMitoTVVLK3QxQzcxVWU0UUVTaHMyblY3QVVWUW5KOU41TmNQMUZzUXRYYXJQYnE0QUVEL1VxZG5zcDY4RnpPWXdOMmo1RGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJFSEVmSjZha2V1cXFpdWV3c1ZKWldsclcxQkxqV0lnMi9GcnYvNm1MQXRJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJaN1ZORDVTMiIsIm1lIjp7ImlkIjoiMjM0NzAyNjEzODM4NDo4MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE4NDMyMzE1MjA4MDk1MTo4MkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p2SzdmSURFTUN3d3I0R0dCUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImJCUHNVUCt2RjMyNUNCVEJYWDZSZFBmZXhRK3VzUDhwVmg5M1pxZzN3UlU9IiwiYWNjb3VudFNpZ25hdHVyZSI6InVvdmtnTFR1ZFEwa3pWd0p5RncrMUJvRzQrdVNpNjFULzRHYkRjQVRwYklzOVdpaFJyd081MFY4cGNXSG5ZM1B2QmdRbXMybW1IaGt0QXI4WU9sMkJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvMkEvU2JISkhOVHljZXQzZGtWaFVkMGNNeHlWdzlrU3REaDNNOTYybGxlMzI1OGZFVVp3bWhmV1ZRNjZOUkFxQ2szQWQ1RXZIQ1JkdGJFMWJ3WXNpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMjYxMzgzODQ6ODJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV3dUN0ZEL3J4ZDl1UWdVd1YxK2tYVDMzc1VQcnJEL0tWWWZkMmFvTjhFViJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNzIzNzI1LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBmdiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
