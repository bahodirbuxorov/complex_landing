const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwDvHjUeAyaNPQES_AG82zILI3Pt9iR2OnA-PtMoYd4IxNoEMgSq7oWQ0k7WVHHg3c0/exec";

export type GoogleSheetPayload = {
  name: string;
  phone: string;
  sheet?: string;
};

export const sendToGoogleSheet = async (payload: GoogleSheetPayload) => {
  try {
    // Telefon raqamni Google Sheet uchun matn formatida yuborish
    // Apostrof qo'shib yuboramiz, shunda Google Sheets uni matn deb o'qiydi
    const data = {
      name: payload.name,
      phone: payload.phone, // formatlanmagan holda: +998 XX XXX XX XX
      sheet: payload.sheet || "Complex", 
    };

    console.log("📤 Sending to Google Sheet:", data);
    
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("✅ Google Sheet POST request sent successfully");
    console.log("📊 Data sent:", data);
    
    return true;
  } catch (error) {
    console.error("❌ Google Sheet request failed:", error);
    return false;
  }
};
