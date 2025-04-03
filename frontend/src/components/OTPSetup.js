import React, { useState } from "react";
import axios from "axios";

export default function OTPSetup() {
    const [userId, setUserId] = useState(""); // Holds the user ID for TOTP setup
    const [qrCode, setQrCode] = useState(null); // Holds the QR code URL
    const [secret, setSecret] = useState(""); // Holds the TOTP secret
    const [token, setToken] = useState(""); // Holds the OTP entered by the user
    const [verificationMessage, setVerificationMessage] = useState(null); // Holds verification feedback
    const [loading, setLoading] = useState(false); // Loading state for API calls
    const [error, setError] = useState(null); // Error message state

    // Function to generate TOTP
    const generateTOTP = async () => {
        if (!userId) {
            setError("User ID is required!");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:3000/api/setup-otp", { userId });
            setQrCode(response.data.qrCode);
            setSecret(response.data.secret);
        } catch (error) {
            setError("Failed to generate OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to verify the OTP
    const verifyOTP = async () => {
        if (!token) {
            setError("Please enter the OTP before verifying.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:3000/api/verify-otp", {
                userId,
                token,
            });
            setVerificationMessage(response.data.message || "OTP Verified Successfully!");
        } catch (error) {
            setError("Verification failed. Invalid OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🔐 Set Up TOTP</h2>

            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {verificationMessage && <div className="text-green-600 text-sm mb-2">{verificationMessage}</div>}

            <input
                type="text"
                placeholder="Enter User ID"
                className="border p-2 w-full mb-4 rounded focus:ring-2 focus:ring-blue-400"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />

            <button
                onClick={generateTOTP}
                className={`w-full px-4 py-2 rounded text-white font-semibold transition ${
                    loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate OTP"}
            </button>

            {qrCode && (
                <div className="mt-4 bg-white p-4 rounded shadow">
                    <h3 className="font-semibold text-gray-800">Scan the QR Code:</h3>
                    <img src={qrCode} alt="QR Code" className="w-1/2 mx-auto mt-2" />
                    <p className="mt-2 text-sm text-gray-600">
                        <strong>Secret:</strong> {secret}
                    </p>
                </div>
            )}

            <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Enter OTP to Verify</h3>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="border p-2 w-full mb-2 rounded focus:ring-2 focus:ring-green-400"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                />
                <button
                    onClick={verifyOTP}
                    className={`w-full px-4 py-2 rounded text-white font-semibold transition ${
                        loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </div>
        </div>
    );
}
