import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // ----------------------------------------------------------------------
        // TODO: INTEGRATION POINT
        // ----------------------------------------------------------------------
        // 1. Google Sheets Integration:
        //    - Use 'google-spreadsheet' package or Google Sheets API.
        //    - Append `data` (SmartID, Name, Phone, etc.) to the sheet.
        //
        // 2. Email Sending (Nodemailer / Resend / SendGrid):
        //    - Send an email to `contacto@comfortstudioperu.com` with the details.
        //    - Send a confirmation email to the client (`data.email`).
        // ----------------------------------------------------------------------

        console.log("Quote Received:", data);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({
            success: true,
            message: "Cotización procesada correctamente",
            ticketId: data.ticketId
        });

    } catch (error) {
        console.error("Error processing quote:", error);
        return NextResponse.json(
            { success: false, message: "Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}
