"use client"

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/authenticated/players/profile", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setUser(null);
      setError(err.message || "Failed to fetch user data.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={fetchUser}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        Get Current User
      </button>

      {error && (
        <div style={{ color: "red", marginBottom: 20 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {user && (
        <div style={{ border: "1px solid #ddd", padding: 20, borderRadius: 8 }}>
          <h2>User Info</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Region:</strong> {user.region || "N/A"}</p>
          <p><strong>Classic Points:</strong> {user.classicPoints}</p>
          <p><strong>Platformer Points:</strong> {user.platformerPoints}</p>
          <p><strong>Active:</strong> {user.active ? "Yes" : "No"}</p>
          <p><strong>Flagged:</strong> {user.flagged ? "Yes" : "No"}</p>
          <p><strong>Discord:</strong> {user.discord || "N/A"}</p>
          <p><strong>YouTube:</strong> {user.youtube || "N/A"}</p>
          <p><strong>Twitter:</strong> {user.twitter || "N/A"}</p>
          <p><strong>Twitch:</strong> {user.twitch || "N/A"}</p>
          <p><strong>Avatar:</strong> <Image src={user.avatar} alt="aaa" height="50" width="50" /></p>
          {/* You can add badges and records display here if you want */}
        </div>
      )}
    </div>
  );
}
