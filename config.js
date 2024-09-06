const { Sequelize } = require("sequelize");
require("dotenv").config();
const toBool = x => x === "true";
const DATABASE_URL = process.env.DATABASE_URL || "./database.db";
module.exports = {
 SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMksrU0pURkRJUDZmZVB6d2cxb05HbmRjRlF5czZwaGdDQzBuREI2eGxVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVlPbi9yaUhiQTdtbG05OWIrRDgyNklLcHI3Q0U0OWlYL2JkQjdIdVZYbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRjFUR0daYmVreUcyaDljUkZCZ1NHSlYxNjNSKzQ2SVhGNUpUQnVNNFVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBaE53Z2luUnJNdGNVbE0zVE5DV0pzZEIyV2xpZ0YvOXg5UWRUblJubDJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKa2FXVG1YNkRwa3llcElkYUg1VlVYUGd5NmpqL2loRmJyZGZscFhWMU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9lNGl0VWMvdWM5UE45TjJzQ2V2b01VcU1pWnRuV0dER0UwWlF2bFVCVWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkEycXNZYjd3akJxcUhpMU83Ny8vVzYvUmdua0llUytDWmdtZE1RZ1lFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoienVjTTFKbU1xOHBocjNLUTBNRlBNaDNKNjE4Q1pxSE5GSDNRN3UxM01Hdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkI5L29qdytLNTZwUWJ4MzJCRUJzTHd3NEgxNnFZWWVJNmZGQ2I2SXE3aWltWHhqVlZQaGlXWEpXQll2N1JzbG00VThKWHUzSVZlMVJzRWdJWmt2OGhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzUsImFkdlNlY3JldEtleSI6IndkT3hVOGN0aHBBRWhDRFZJYnR0bmpYTWRwaE1raXVHeUs1cGh2WCsvMWs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjRJaE9yZFlGUUJDMnpvY1hFTUJ3aXciLCJwaG9uZUlkIjoiYWI3N2Y2NWMtZTFiNC00YjAxLTlhZGMtMjg1ZmQwMmRiN2RiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVwWjVqcW1DL2dnZ3pndGF6NnhOQ21vOVc4az0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOMjI4bzBPZ1R5SFREdWhTbi9CbmJPODRnOUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSkFMR05QOVYiLCJtZSI6eyJpZCI6IjI2MzcxNzY3MjA2ODo2OUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE4MTI2OTE3ODY0NjY3MTo2OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xiSjAvb0RFSnpVMHJZR0dDQWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im04cDdnUm1Kb0FROEcvUU1qL2RaVEtybWVsUkZGQ0h1cnJyU1haa1FuMTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImU3dGc3ZHRWa2dUVnZ6M1JPYUxhUVlrRDBHNVhGYXVtZjV0NlVvSmd0cnR3eEdnazdvMmhJN2cvRUlTczhKMFJwRkVJWDZxbDJkRDRBcXg2M2xuWURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJobmdKb1BxZURxRzlFWkZwRUlVVmo3Wm9YUVZUcERvV3pWSGl4WUthZlYzelRLMXFzWElHbWdBbmpHckRkQkVza3M0QnZrOFIzZ2NhSHFZbklpaDZpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNzY3MjA2ODo2OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJadktlNEVaaWFBRVBCdjBESS8zV1V5cTVucFVSUlFoN3E2NjBsMlpFSjlmIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjUyMTMyMjYsImxhc3RQcm9wSGFzaCI6IjJaTjZpdiJ9",
 HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "[.]",
 BOT_INFO: process.env.BOT_INFO || "ᴀsᴛʀᴏ;ғxᴏᴘ-ᴍᴅ", //YourName;BotName;Image/VideoLink
 SUDO: process.env.SUDO || "2348039607375,2349162411207",
 TIME_ZONE: process.env.TIME_ZONE || "Africa/Lagos",
 LOGS: toBool(process.env.LOGS) || true,
 ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
 BRANCH: "master",
 WARN_COUNT: 3,
 AUTHOR: process.env.AUTHOR || "ғxᴏᴘ-ᴍᴅ",
 ANTIWORDS: process.env.ANTIWORDS || "badword1,badword2,badword3",
 PACKNAME: process.env.PACKNAME || "ғxᴏᴘ-ᴍᴅ",
 WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",
 GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
 ANTILINK: toBool(process.env.ANTI_LINK) || false,
 HEROKU: toBool(process.env.HEROKU) || false,
 AUTO_READ: toBool(process.env.AUTO_READ) || false,
 RMBG_KEY: process.env.RMBG_KEY || "",
 AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || false,
 WORK_TYPE: process.env.WORK_TYPE || "private",
 DELETED_LOG: toBool(process.env.DELETED_LOG) || false,
 DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
 REMOVEBG: process.env.REMOVEBG || "",
 DATABASE_URL: DATABASE_URL,
 STATUS_SAVER: toBool(process.env.STATUS_SAVER) || true,
 HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
 HEROKU_API_KEY: process.env.HEROKU_API_KEY,
 DATABASE:
  DATABASE_URL === "./database.db"
   ? new Sequelize({
      dialect: "sqlite",
      storage: DATABASE_URL,
      logging: false,
     })
   : new Sequelize(DATABASE_URL, {
      dialect: "postgres",
      ssl: true,
      protocol: "postgres",
      dialectOptions: {
       native: true,
       ssl: { require: true, rejectUnauthorized: false },
      },
      logging: false,
     }),
};
