// Blueprint Email Templates
// Drop these into your handleContact function

export function adminEmailHtml({ name, email, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New message from ${name}</title>
</head>
<body style="margin:0;padding:0;background:#EDF2F7;font-family:'Courier New',Courier,monospace;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#EDF2F7;padding:40px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#1B2A4A;padding:24px 32px;border-bottom:3px solid #2D6BE4;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family:'Courier New',monospace;font-size:16px;font-weight:bold;color:#ffffff;letter-spacing:0.08em;">UKHALID<span style="color:#2D6BE4;">_DEV</span></span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:32px;">

          <!-- Eyebrow -->
          <p style="margin:0 0 20px;font-family:'Courier New',monospace;font-size:10px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#6B84A8;">/* new_message() */</p>

          <!-- Headline -->
          <h1 style="margin:0 0 28px;font-family:'Courier New',monospace;font-size:22px;font-weight:bold;color:#1B2A4A;letter-spacing:-0.02em;line-height:1.2;">New message from<br><span style="color:#2D6BE4;">${name}</span></h1>

          <!-- Divider -->
          <div style="height:1px;background:#BFD0E8;margin-bottom:28px;"></div>

          <!-- Properties panel -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #BFD0E8;margin-bottom:28px;">
            <tr>
              <td style="background:#EDF2F7;padding:10px 16px;border-bottom:1px solid #BFD0E8;">
                <span style="font-family:'Courier New',monospace;font-size:9px;font-weight:bold;letter-spacing:0.14em;text-transform:uppercase;color:#2D6BE4;">// properties</span>
              </td>
            </tr>
            <tr>
              <td style="padding:0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;width:100px;vertical-align:top;">
                      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">name:</span>
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;vertical-align:top;">
                      <span style="font-family:'Courier New',monospace;font-size:12px;font-weight:bold;color:#1B2A4A;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;width:100px;vertical-align:top;">
                      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">email:</span>
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;vertical-align:top;">
                      <a href="mailto:${email}" style="font-family:'Courier New',monospace;font-size:12px;font-weight:bold;color:#2D6BE4;text-decoration:none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;width:100px;vertical-align:top;">
                      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">received:</span>
                    </td>
                    <td style="padding:12px 16px;vertical-align:top;">
                      <span style="font-family:'Courier New',monospace;font-size:11px;color:#1B2A4A;">${new Date().toUTCString()}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Message block -->
          <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:9px;font-weight:bold;letter-spacing:0.14em;text-transform:uppercase;color:#6B84A8;">// message</p>
          <div style="background:#EDF2F7;border-left:3px solid #2D6BE4;padding:18px 20px;margin-bottom:28px;">
            <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;font-weight:300;color:#1B2A4A;line-height:1.8;">${message.replace(/\n/g, "<br>")}</p>
          </div>

          <!-- Reply CTA -->
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#2D6BE4;padding:12px 28px;">
                <a href="mailto:${email}?subject=Re: Your message" style="font-family:'Courier New',monospace;font-size:11px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to ${name} →</a>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#EDF2F7;padding:16px 32px;border-top:1px solid #BFD0E8;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">ukhalid.dev</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function confirmationEmailHtml({ name, email, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Message received</title>
</head>
<body style="margin:0;padding:0;background:#EDF2F7;font-family:'Courier New',Courier,monospace;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#EDF2F7;padding:40px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#1B2A4A;padding:24px 32px;border-bottom:3px solid #2D6BE4;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family:'Courier New',monospace;font-size:16px;font-weight:bold;color:#ffffff;letter-spacing:0.08em;">UKHALID<span style="color:#2D6BE4;">_DEV</span></span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:32px;">

          <!-- Eyebrow -->
          <p style="margin:0 0 20px;font-family:'Courier New',monospace;font-size:10px;font-weight:bold;letter-spacing:0.16em;text-transform:uppercase;color:#6B84A8;">/* send_message() → success */</p>

          <!-- Headline -->
          <h1 style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:22px;font-weight:bold;color:#1B2A4A;letter-spacing:-0.02em;line-height:1.2;">Got it, <span style="color:#2D6BE4;">${name}.</span></h1>

          <p style="margin:0 0 28px;font-family:'Courier New',monospace;font-size:13px;font-weight:300;color:#6B84A8;line-height:1.8;">Thanks for reaching out. I've received your message and will get back to you within 24 hours.</p>

          <!-- Divider -->
          <div style="height:1px;background:#BFD0E8;margin-bottom:28px;"></div>

          <!-- Message receipt -->
          <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:9px;font-weight:bold;letter-spacing:0.14em;text-transform:uppercase;color:#6B84A8;">// your_message</p>
          <div style="background:#EDF2F7;border-left:3px solid #BFD0E8;padding:18px 20px;margin-bottom:28px;">
            <p style="margin:0;font-family:'Courier New',monospace;font-size:13px;font-weight:300;color:#6B84A8;line-height:1.8;">${message.replace(/\n/g, "<br>")}</p>
          </div>

          <!-- Properties -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #BFD0E8;margin-bottom:28px;">
            <tr>
              <td style="background:#EDF2F7;padding:10px 16px;border-bottom:1px solid #BFD0E8;">
                <span style="font-family:'Courier New',monospace;font-size:9px;font-weight:bold;letter-spacing:0.14em;text-transform:uppercase;color:#2D6BE4;">// status</span>
              </td>
            </tr>
            <tr>
              <td style="padding:0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;width:130px;">
                      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">received:</span>
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;">
                      <span style="font-family:'Courier New',monospace;font-size:11px;color:#1B2A4A;font-weight:bold;">✓ confirmed</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;width:130px;">
                      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">response_time:</span>
                    </td>
                    <td style="padding:12px 16px;border-bottom:1px solid #EDF2F7;">
                      <span style="font-family:'Courier New',monospace;font-size:11px;color:#1B2A4A;">"~24 hours"</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px;width:130px;">
                      <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">reply_to:</span>
                    </td>
                    <td style="padding:12px 16px;">
                      <span style="font-family:'Courier New',monospace;font-size:11px;color:#2D6BE4;">contact@ukhalid.dev</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- View work CTA -->
          <p style="margin:0 0 16px;font-family:'Courier New',monospace;font-size:12px;font-weight:300;color:#6B84A8;">While you wait, take a look at some of my recent work:</p>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#1B2A4A;padding:12px 28px;">
                <a href="https://ukhalid.dev/projects" style="font-family:'Courier New',monospace;font-size:11px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;text-decoration:none;">./view work →</a>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#EDF2F7;padding:16px 32px;border-top:1px solid #BFD0E8;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-family:'Courier New',monospace;font-size:10px;color:#6B84A8;">Usman Khalid — ukhalid.dev</span>
              </td>
              <td align="right">
                <span style="font-family:'Courier New',monospace;font-size:10px;color:#BFD0E8;">Birmingham, UK</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
