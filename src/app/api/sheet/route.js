import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function GET() {
  try {
    const doc = await getGoogleSheetDoc();
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();

    const rows = await sheet.getRows();

    return Response.json({
      success: true,
      count: rows.length,
      message: `Successfully retrieved ${rows.length} entries`,
    });
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return Response.json(
      {
        success: false,
        count: 0,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, city, phone, email } = body;

    // Validation
    if (!name || !city || !phone || !email) {
      return Response.json(
        {
          success: false,
          status: "error",
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      return Response.json(
        {
          success: false,
          status: "error",
          message: "Phone number must be 10 digits",
        },
        { status: 400 },
      );
    }

    // Initialize Google Sheets
    const doc = await getGoogleSheetDoc();
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Check for duplicates before adding
    const rows = await sheet.getRows();
    const phoneExists = rows.find((row) => row.get("Phone") === phone);
    const emailExists = rows.find((row) => row.get("Email") === email);

    if (phoneExists && emailExists) {
      return Response.json({
        success: false,
        status: "exists",
        message: "This phone number and email are already registered",
      });
    } else if (phoneExists) {
      return Response.json({
        success: false,
        status: "exists",
        message: "This phone number is already registered",
      });
    } else if (emailExists) {
      return Response.json({
        success: false,
        status: "exists",
        message: "This email is already registered",
      });
    }

    // Add new row
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    await sheet.addRow({
      Name: name,
      City: city,
      Phone: phone,
      Email: email,
      Timestamp: timestamp,
    });

    return Response.json({
      success: true,
      status: "success",
      count: rows.length + 1,
      message: "Successfully added to waitlist!",
    });
  } catch (error) {
    console.error("Error adding to sheet:", error);
    return Response.json(
      {
        success: false,
        status: "error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Helper function to initialize Google Sheets
async function getGoogleSheetDoc() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const auth = new JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(sheetId, auth);
  return doc;
}
