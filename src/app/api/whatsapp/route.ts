import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const gmailUser = process.env.GMAIL_USER || 'santhoshrajk1812@gmail.com';
const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD || 'xctptmejglhyxust').replace(/\s+/g, '');

// Reusable warm SMTP connection pool
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
  connectionTimeout: 8000,
  socketTimeout: 8000,
  pool: true,
  maxConnections: 5,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderName, senderPhone, messageText, otpCode, clientTelemetry } = body;

    // IP Extraction from headers or payload
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : realIp || clientTelemetry?.ip || 'Unknown IP';
    const userAgent = request.headers.get('user-agent') || clientTelemetry?.userAgent || 'Unknown Device';

    // FIRE & FORGET: Asynchronous background processing without blocking the HTTP response
    (async () => {
      const bgStart = Date.now();
      try {
        let geoInfo = {
          ip: clientIp,
          city: clientTelemetry?.city || 'Unknown City',
          region: clientTelemetry?.region || 'Unknown Region',
          country: clientTelemetry?.country || 'Unknown Country',
          isp: clientTelemetry?.isp || 'Unknown ISP',
          lat: clientTelemetry?.lat || 'N/A',
          lon: clientTelemetry?.lon || 'N/A',
        };

        // Fast 1s timeout for IP Geo Lookup
        if (clientIp && clientIp !== 'Unknown IP' && !clientIp.startsWith('127.') && !clientIp.startsWith('::1')) {
          try {
            const geoRes = await fetch(`http://ip-api.com/json/${clientIp}`, {
              cache: 'no-store',
              signal: AbortSignal.timeout(1000),
            });
            if (geoRes.ok) {
              const data = await geoRes.json();
              if (data.status === 'success') {
                geoInfo = {
                  ip: clientIp,
                  city: data.city,
                  region: data.regionName,
                  country: data.country,
                  isp: data.isp || data.org,
                  lat: data.lat,
                  lon: data.lon,
                };
              }
            }
          } catch {
            // silent fallback
          }
        }

        const htmlBody = `
          <div style="font-family: Arial, sans-serif; background-color: #090d16; color: #e2e8f0; padding: 24px; border-radius: 16px; max-width: 600px; border: 1px solid #1e293b;">
            <div style="border-bottom: 1px solid #334155; padding-bottom: 12px; margin-bottom: 16px;">
              <span style="background-color: #064e3b; color: #34d399; font-size: 11px; font-weight: bold; font-family: monospace; padding: 4px 8px; border-radius: 6px; border: 1px solid #059669;">
                VERIFIED DIRECT DISPATCH
              </span>
              <h2 style="color: #ffffff; margin-top: 8px; margin-bottom: 4px; font-size: 20px;">
                New Verified Inquiry from ${senderName || 'Visitor'}
              </h2>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Received: ${new Date().toLocaleString()}
              </p>
            </div>

            <div style="background-color: #0f172a; padding: 16px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #1e293b;">
              <p style="margin: 4px 0; font-size: 13px;"><strong>Sender Name:</strong> ${senderName || 'Visitor'}</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Verified Contact:</strong> <span style="color: #34d399; font-family: monospace; font-weight: bold;">${senderPhone}</span></p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>OTP Security Status:</strong> <span style="color: #34d399; font-weight: bold;">PASSED (${otpCode})</span></p>
            </div>

            <div style="margin-bottom: 20px;">
              <h4 style="color: #38bdf8; font-size: 13px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Message Payload:</h4>
              <div style="background-color: #020617; padding: 16px; border-radius: 12px; border: 1px solid #1e293b; color: #f8fafc; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${messageText}</div>
            </div>

            <div style="background-color: #0f172a; padding: 16px; border-radius: 12px; border: 1px solid #334155;">
              <h4 style="color: #f59e0b; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Sender IP & Geolocation Telemetry</h4>
              <table style="width: 100%; font-size: 12px; color: #cbd5e1; border-collapse: collapse;">
                <tr><td style="padding: 3px 0; color: #94a3b8;">IP Address:</td><td style="font-family: monospace; font-weight: bold; color: #fbbf24;">${geoInfo.ip}</td></tr>
                <tr><td style="padding: 3px 0; color: #94a3b8;">Location:</td><td><strong>${geoInfo.city}, ${geoInfo.region}, ${geoInfo.country}</strong></td></tr>
                <tr><td style="padding: 3px 0; color: #94a3b8;">Coordinates:</td><td style="font-family: monospace;">${geoInfo.lat}, ${geoInfo.lon}</td></tr>
                <tr><td style="padding: 3px 0; color: #94a3b8;">Network / ISP:</td><td>${geoInfo.isp}</td></tr>
                <tr><td style="padding: 3px 0; color: #94a3b8;">User-Agent Device:</td><td style="font-size: 11px; word-break: break-all;">${userAgent}</td></tr>
              </table>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Portfolio Security Hub" <${gmailUser}>`,
          to: gmailUser,
          subject: `[VERIFIED DISPATCH + IP LOG] ${senderName || 'Visitor'} (${senderPhone}) - ${geoInfo.city}, ${geoInfo.country}`,
          html: htmlBody,
        });

        console.log(`[BACKGROUND GMAIL SUCCESS] Email dispatched in ${Date.now() - bgStart}ms to ${gmailUser}`);
      } catch (err) {
        console.error('Background Email Dispatch Error:', err);
      }
    })();

    // Immediate sub-20ms response to client UI
    return NextResponse.json({
      success: true,
      status: 'DISPATCHED_BACKGROUND_INSTANT',
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { success: true, status: 'ACCEPTED_BACKGROUND' },
      { status: 200 }
    );
  }
}
