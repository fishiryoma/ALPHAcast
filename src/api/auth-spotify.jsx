import axios from "axios";

// Code Verifier
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
const codeVerifier = generateRandomString(64);

// Code Challenge
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
const hashed = sha256(codeVerifier);
const codeChallenge = base64encode(hashed);

//Request User Authorization
const clientId = "f93bfda7ee8e47569890f4812c3add02";
const redirectUri = "http://localhost:3000/";
const scope = "user-read-private user-read-email";
const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const authUrl = new URL("https://accounts.spotify.com/authorize");

// generated in the previous step
// const codeVerifier = generateRandomString(64);
window.localStorage.setItem("code_verifier", codeVerifier);
const codeChallengeMethod = "S256";
// const codeChallenge = base64encode(hashed);

const params = {
  response_type: "code",
  client_id: clientId,
  scope,
  code_challenge_method: codeChallengeMethod,
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
};

authUrl.search = new URLSearchParams(params).toString();

export const getSpotifyToken = async () => {
  try {
    const res = await axios.get(authUrl.toString());
    console.log(res);
  } catch (err) {
    console.log(`get Spotify token failed ${err}`);
  }
};
