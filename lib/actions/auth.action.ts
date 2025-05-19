'use server'
import { db, auth } from "../../firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;

//sign up into the website
export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (e: any) {
    console.error("error creating user", e);
    if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: "Email already exists",
      };
    }
    return {
      success: false,
      message: "failed to create user",
    };
  }
}

//sign in into the website
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead",
      };
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (e: any) {
    console.error("Error signing in", e);
    return {
      success: false,
      message: e.code === 'auth/user-not-found' ? "User not found" : "Failed to sign in",
    };
  }
}

//create a session cookie
export async function setSessionCookie(idToken: string) {
  try {
    const cookieStore = cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK,
    });

    (await cookieStore).set("session", sessionCookie, {
      maxAge: ONE_WEEK / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  } catch (e) {
    console.error("Error creating session cookie", e);
    throw new Error("Failed to create session cookie");
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userRecord.exists) {
      return null;
    }

    const userData = userRecord.data();
    return {
      name: userData?.name || "",
      email: userData?.email || "",
      id: decodedClaims.uid,
      uid: decodedClaims.uid,
    } as User;

  } catch (e) {
    console.error("Error getting current user", e);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}

const fetchData = async (params: Record<string, unknown>): Promise<unknown> => {
  // function implementation
};