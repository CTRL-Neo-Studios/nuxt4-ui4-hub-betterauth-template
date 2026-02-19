import { Resend } from 'resend'

export function useServerMailing() {
    const $rc = useRuntimeConfig()
    const resend = new Resend($rc.resend.apiKey)

    function getVerifyEmailHtml(magicUrl: string) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">    <title>Verify your sign-up</title>
    <!-- Importing Geist Sans and Geist Mono -->
    <!-- Note: Many email clients strip external font links.
         The stack below ensures it falls back gracefully to system fonts if Geist fails to load. -->
    <style>
        /* Base Resets */
        body {
            margin: 0;
            padding: 0;
            background-color: #f7f8fa;
            /* Prioritizing Geist, falling back to clean system sans-serifs */
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            -webkit-font-smoothing: antialiased;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            padding: 40px;
            box-sizing: border-box;
            text-align: center;
        }

        /* Typography */
        h1 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 16px 0;
            color: #000;
            letter-spacing: -0.02em; /* Slight tightening for Geist/Modern look */
        }

        p {
            font-size: 15px; /* Slightly bumped for readability */
            line-height: 1.6;
            color: #555;
            margin: 0 0 24px 0;
        }

        .header-brand {
            margin-bottom: 30px;
            font-weight: 600;
            font-size: 18px;
            color: #333;
            display: block;
        }

        .instruction-text {
            color: #666;
            margin-bottom: 30px;
            padding: 0 20px;
        }

        /* Magic Link Button
           Styles to look like the previous box, but clickable
        */
        .magic-link-btn {
            display: inline-block;
            background-color: #f1f3f5;
            border-radius: 8px;
            padding: 18px 40px;
            margin: 10px 0 30px 0;

            /* Font Styling */
            font-family: 'Geist Mono', 'Courier New', monospace; /* Mono font for the action */
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            text-decoration: none;

            /* Interaction */
            border: 1px solid transparent;
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .magic-link-btn:hover {
            background-color: #e9ecef;
            border-color: #dee2e6;
            color: #000;
        }

        /* Footer / Disclaimer */
        .disclaimer {
            font-size: 13px;
            color: #888;
            margin-bottom: 40px;
        }

        .divider {
            height: 1px;
            background-color: #eee;
            margin: 30px 0;
            border: none;
        }

        .footer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            font-family: 'Geist', sans-serif;
        }

        /* Responsive */
        @media screen and (max-width: 600px) {
            .email-container {
                margin: 20px;
                padding: 30px 20px;
                width: auto;
            }
            .magic-link-btn {
                width: 100%; /* Full width button on mobile */
                box-sizing: border-box;
            }
        }
    </style>
</head>
<body>

<div class="email-container">

    <!-- Brand Name (No Icon) -->
    <span class="header-brand">CyberAcme</span>

    <!-- Title -->
    <h1>Verify your sign-up</h1>

    <!-- Instructions -->
    <p class="instruction-text">
        We received a sign-up attempt for your email address. Click the button below to verify your account and be automatically redirected to CyberAcme.
    </p>

    <!-- Magic Link Action -->
    <!-- Replace '#' with your actual verification URL -->
    <a href="${magicUrl}" class="magic-link-btn">
        Click to Verify
    </a>

    <!-- Warning Text -->
    <p class="disclaimer">
        If you did not attempt to sign up but received this email, please disregard it. This link will expire in 10 minutes.
    </p>

    <hr class="divider">

    <!-- Footer -->
    <div class="footer">
        <p style="margin-bottom:10px;">CyberAcme.</p>
        <p>&copy; CyberAcme 2023~2026. All rights reserved.</p>
    </div>
</div>

</body>
</html>`
    }

    function getResetPasswordHtml(magicUrl: string) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">    <title>Verify your sign-up</title>
    <!-- Importing Geist Sans and Geist Mono -->
    <!-- Note: Many email clients strip external font links.
         The stack below ensures it falls back gracefully to system fonts if Geist fails to load. -->
    <style>
        /* Base Resets */
        body {
            margin: 0;
            padding: 0;
            background-color: #f7f8fa;
            /* Prioritizing Geist, falling back to clean system sans-serifs */
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            -webkit-font-smoothing: antialiased;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            padding: 40px;
            box-sizing: border-box;
            text-align: center;
        }

        /* Typography */
        h1 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 16px 0;
            color: #000;
            letter-spacing: -0.02em; /* Slight tightening for Geist/Modern look */
        }

        p {
            font-size: 15px; /* Slightly bumped for readability */
            line-height: 1.6;
            color: #555;
            margin: 0 0 24px 0;
        }

        .header-brand {
            margin-bottom: 30px;
            font-weight: 600;
            font-size: 18px;
            color: #333;
            display: block;
        }

        .instruction-text {
            color: #666;
            margin-bottom: 30px;
            padding: 0 20px;
        }

        /* Magic Link Button
           Styles to look like the previous box, but clickable
        */
        .magic-link-btn {
            display: inline-block;
            background-color: #f1f3f5;
            border-radius: 8px;
            padding: 18px 40px;
            margin: 10px 0 30px 0;

            /* Font Styling */
            font-family: 'Geist Mono', 'Courier New', monospace; /* Mono font for the action */
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            text-decoration: none;

            /* Interaction */
            border: 1px solid transparent;
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .magic-link-btn:hover {
            background-color: #e9ecef;
            border-color: #dee2e6;
            color: #000;
        }

        /* Footer / Disclaimer */
        .disclaimer {
            font-size: 13px;
            color: #888;
            margin-bottom: 40px;
        }

        .divider {
            height: 1px;
            background-color: #eee;
            margin: 30px 0;
            border: none;
        }

        .footer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            font-family: 'Geist', sans-serif;
        }

        /* Responsive */
        @media screen and (max-width: 600px) {
            .email-container {
                margin: 20px;
                padding: 30px 20px;
                width: auto;
            }
            .magic-link-btn {
                width: 100%; /* Full width button on mobile */
                box-sizing: border-box;
            }
        }
    </style>
</head>
<body>

<div class="email-container">

    <!-- Brand Name (No Icon) -->
    <span class="header-brand">CyberAcme</span>

    <!-- Title -->
    <h1>Reset your Password</h1>

    <!-- Instructions -->
    <p class="instruction-text">
        We received a password reset attempt for your account. Click the button below to reset your password.
    </p>

    <!-- Magic Link Action -->
    <!-- Replace '#' with your actual verification URL -->
    <a href="${magicUrl}" class="magic-link-btn">
        Click to Reset Password
    </a>

    <!-- Warning Text -->
    <p class="disclaimer">
        If you did not attempt to reset your password but received this email, please disregard it. This link will expire in 10 minutes.
    </p>

    <hr class="divider">

    <!-- Footer -->
    <div class="footer">
        <p style="margin-bottom:10px;">CyberAcme.</p>
        <p>&copy; CyberAcme 2023~2026. All rights reserved.</p>
    </div>
</div>

</body>
</html>`
    }

    async function sendVerifyEmail(targetEmail: string, magicUrl: string) {
        const response = await resend.emails.send({
            from: 'CyberAcme <noreply@cyberacme.org>',
            to: [targetEmail],
            subject: '[CyberAcme] Verify Your Email',
            html: getVerifyEmailHtml(magicUrl)
        })

        if (response.error) {
            throw createError({
                statusCode: 500,
                message: 'Error sending email',
            });
        }

        return response;
    }

    async function sendResetPassword(targetEmail: string, magicUrl: string) {
        const response = await resend.emails.send({
            from: 'CyberAcme <noreply@cyberacme.org>',
            to: [targetEmail],
            subject: '[CyberAcme] Reset Your Password',
            html: getResetPasswordHtml(magicUrl)
        })

        if (response.error) {
            throw createError({
                statusCode: 500,
                message: 'Error sending email',
            });
        }

        return response;
    }

    function getOtpEmailHtml(title: string, text: string, otp: number | string) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
    
    <!-- Fonts: Geist & IBM Plex Serif -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    
    <style>
        /* Base Resets */
        body {
            margin: 0;
            padding: 0;
            background-color: #f7f8fa;
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            -webkit-font-smoothing: antialiased;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            padding: 40px;
            box-sizing: border-box;
            text-align: center;
        }

        /* Typography */
        h1 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 16px 0;
            color: #000;
            letter-spacing: -0.02em;
        }

        p {
            font-size: 15px;
            line-height: 1.6;
            color: #555;
            margin: 0 0 24px 0;
        }

        .header-brand {
            margin-bottom: 30px;
            font-weight: 600;
            font-size: 18px;
            color: #333;
            display: block;
        }

        .instruction-text {
            color: #666;
            margin-bottom: 30px;
            padding: 0 20px;
        }

        /* OTP Code Box */
        .otp-code {
            display: inline-block;
            background-color: #f1f3f5; /* Light grey background */
            border-radius: 8px;
            padding: 16px 40px;
            margin: 10px 0 30px 0;
            
            /* Typography for the code */
            font-family: 'Geist Mono', monospace; 
            font-size: 32px;
            font-weight: 600;
            letter-spacing: 6px; /* Spaced out for readability */
            color: #1a1a1a;
            
            /* UX features */
            user-select: all; /* Allows double-click to select all numbers instantly */
            cursor: text;
        }

        /* Footer / Disclaimer */
        .disclaimer {
            font-size: 13px;
            color: #888;
            margin-bottom: 40px;
        }

        .divider {
            height: 1px;
            background-color: #eee;
            margin: 30px 0;
            border: none;
        }

        .footer {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            font-family: 'Geist', sans-serif;
        }

        /* Responsive */
        @media screen and (max-width: 600px) {
            .email-container {
                margin: 20px;
                padding: 30px 20px;
                width: auto;
            }
            .otp-code {
                width: 100%;
                box-sizing: border-box;
                padding: 16px 10px; /* Reduce padding on mobile */
                font-size: 28px; /* Slightly smaller font on mobile */
            }
        }
    </style>
</head>
<body>

<div class="email-container">

    <!-- Brand Name (No Icon) -->
    <span class="header-brand">CyberAcme</span>

    <!-- Dynamic Title -->
    <h1>${title}</h1>

    <!-- Instructions -->
    <p class="instruction-text">
        ${text}
    </p>

    <!-- OTP Code Display -->
    <!-- Inject your 6 digit code here -->
    <div class="otp-code">${otp}</div>

    <!-- Warning Text -->
    <p class="disclaimer">
        If you did not request this code, please disregard this email. The code will remain active for 10 minutes.
    </p>

    <hr class="divider">

    <!-- Footer -->
    <div class="footer">
        <p style="margin-bottom:10px;">CyberAcme.</p>
        <p>&copy; CyberAcme 2023~2026. All rights reserved.</p>
    </div>
</div>

</body>
</html>`
    }

    async function sendVerifyEmailOtp(targetEmail: string, otp: number | string) {
        const title = 'Verify your email address'
        const email = getOtpEmailHtml(title, 'Thank you for signing up with CyberAcme. Use the code below to verify your email address.', otp)

        const response = await resend.emails.send({
            from: 'CyberAcme <noreply@cyberacme.org>',
            to: [targetEmail],
            subject: `[CyberAcme] ${title}`,
            html: email
        })

        if (response.error) {
            throw createError({
                statusCode: 500,
                message: 'Error sending email',
            });
        }

        return response;
    }

    async function sendSignInEmailOtp(targetEmail: string, otp: number | string) {
        const title = 'Complete your sign-in'
        const email = getOtpEmailHtml(title, 'We received a sign-in attempt for your account. Use the code below to proceed.', otp)

        const response = await resend.emails.send({
            from: 'CyberAcme <noreply@cyberacme.org>',
            to: [targetEmail],
            subject: `[CyberAcme] ${title}`,
            html: email
        })

        if (response.error) {
            throw createError({
                statusCode: 500,
                message: 'Error sending email',
            });
        }

        return response;
    }

    async function sendForgotPasswordEmailOtp(targetEmail: string, otp: number | string) {
        const title = 'Reset your password'
        const email = getOtpEmailHtml(title, 'We received a request to reset the password for your CyberAcme account. Use the code below to set a new password.', otp)

        const response = await resend.emails.send({
            from: 'CyberAcme <noreply@cyberacme.org>',
            to: [targetEmail],
            subject: `[CyberAcme] ${title}`,
            html: email
        })

        if (response.error) {
            throw createError({
                statusCode: 500,
                message: 'Error sending email',
            });
        }

        return response;
    }

    return {
        getVerifyEmailHtml,
        sendVerifyEmail,
        getResetPasswordHtml,
        sendResetPassword,
        getOtpEmailHtml,
        sendVerifyEmailOtp,
        sendSignInEmailOtp,
        sendForgotPasswordEmailOtp
    }
}