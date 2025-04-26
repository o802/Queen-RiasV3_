const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝕴𝕿𝖅 𝕭𝕽𝕴𝕬𝕹",
    ownerNumber: process.env.OWNER_NUMBER || "2347026138384",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "available",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS09NQWpvU0NzVzZkdlVONFRDWWtzakp4bjU3Ni9ITWVKZ0tHZ2FhVDhYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVJBbWlneEtCL3Nxa2F4SVc1cllzQk9KQ3ZrWERTU3RYUmMxTWpTeEdSaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SEltUmcyeUtPczAzQ0tGOFNycnNhRTVZU1pVclJrVjVYU0tobm9DRUU0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJheUVHN2ZMWFJUT2krVmkwalVSdU5SaVZwU3RCYSswS0ZBMk0vRmsxSW1VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklMMDk1Nnl1SGhIYk44NnRnMlVBMmw0UkwxdjQyQkpUWWdkNG9MeDB5MFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhGbWJZV0RpUVZaSzMrSXA2NkFWQXUxeGxLTkR6NHV4Q1gxSTBUdGtYd0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVBVbmNpanM1TWhkalRKY2ZCUmNaUFppY3NKT3lSd0IzanEzTWtUOGUyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYllObW5mTndQZFlkTHdVckdSMnNiQm1vVGhlc1AwZzBOckJzV2grdjgxMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhXRVd4cnE2OTd0eGNtZUpKV1pIZUxjQWFSeEtZb1IvMzJmMzMySExleVlPMDI2Ym1XbW5XQnZidG80SGtiTzRYQ25FV0Q4WWZQMHBZbWJjdWUyc2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDYsImFkdlNlY3JldEtleSI6Ik1wMmMxQkRGNVlmRFBjUmsvWGZHN29uKzNIcWtXY0hRTlgvMktCVWg0YXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjFNUkMxUlFDIiwibWUiOnsiaWQiOiIyMzQ3MDI2MTM4Mzg0OjQ0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTg0MzIzMTUyMDgwOTUxOjQ0QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTmFQMHBrSEVQSDNzOEFHR0NJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMlVGZmYrb25yNXlNWVpPeWpPb1RUMmVjU05Tdzh6Mml3ODVNT21BSnNBRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSFRDdU1TVk9jN2E1a3dSTURvSkhLUFpDNmVsdWRXdE1SQ2xjUEFqcXNRTE51d2FFU0VMaVJjekJSWU42SGk1Ui9mS2owRkJNVGRBeGpJeHlhZkVMQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IjNNbHh4eDR0ME1hcTcwc3pKYm9JQkZGUzBPV1VoU2pBNVRwaUFURG5YOGJaSXg5UXZ5alc1T1M2b1ZYUDFKUS8yM1htdHJrM3dYNmtIaWZicUIxVmlBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzAyNjEzODM4NDo0NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkbEJYMy9xSjYrY2pHR1Rzb3pxRTA5bm5FalVzUE05b3NQT1REcGdDYkFCIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU2ODE0MDYsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
