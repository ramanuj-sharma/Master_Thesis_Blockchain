import React, { useState } from "react";
import axios from "axios";

export default function OTPSetup() {
    const [userId, setUserId] = useState(""); // Holds the user ID for TOTP setup
    const [qrCode, setQrCode] = useState(null); // Holds the QR code URL
    const [secret, setSecret] = useState(""); // Holds the TOTP secret
    const [token, setToken] = useState(""); // Holds the OTP entered by the user
    const [verificationMessage, setVerificationMessage] = useState(null); // Holds verification feedback

    // Function to generate TOTP
    const generateTOTP = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/setup-otp", { userId });
            setQrCode(response.data.qrCode);
            setSecret(response.data.secret);
        } catch (error) {
            console.error("Error generating TOTP:", error);
            alert("Failed to generate OTP. Please try again.");
        }
    };

    // Function to verify the OTP
    const verifyOTP = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/verify-otp", {
                userId,
                token,
            });
            setVerificationMessage(response.data);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Verification failed. Invalid OTP.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Set Up TOTP</h2>

            <input
                type="text"
                placeholder="User ID"
                className="border p-2 w-full mb-4 rounded"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />

            <button
                onClick={generateTOTP}
                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded"
            >
                Generate OTP
            </button>

            {qrCode && (
                <div className="mt-4">
                    <h3 className="font-semibold">Scan the QR Code:</h3>
                    <img src={qrCode} alt="QR Code" className="w-1/2 mx-auto mt-2" />
                    <p className="mt-2">Secret: {secret}</p>
                </div>
            )}

            <div className="mt-4">
                <h3 className="font-semibold">Verify OTP</h3>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="border p-2 w-full mb-2 rounded"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <button
                    onClick={verifyOTP}
                    className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded"
                >
                    Verify OTP
                </button>
            </div>

            {verificationMessage && (
                <div className="mt-4 text-green-500">
                    <h4>{verificationMessage}</h4>
                </div>
            )}
        </div>
    );
}