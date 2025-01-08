import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expiresAtInMinute: number) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiresAtInMinute} minutes`)
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession({
  payload,
  expiresAtInMinute,
  path,
}: {
  payload: object | string;
  expiresAtInMinute: number;
  path: string;
}) {
  const expiresAt = new Date(Date.now() + expiresAtInMinute * 60 * 1000);
  let session = "";

  if (typeof payload === "object") {
    session = await encrypt({ ...payload, expiresAt }, expiresAtInMinute);
  }

  const cookieStore = cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path,
  });
}

export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete("session");
}
