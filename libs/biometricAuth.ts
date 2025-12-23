import { startAuthentication } from "@simplewebauthn/browser";
import { apiPost } from "@/utils/endpoints/common";

import {
  API_WEBAUTHN_AUTH_OPTIONS,
  API_WEBAUTHN_AUTH_VERIFY,
} from "@/utils/api/APIConstant";

type BiometricResult = {
  success: boolean;
  error?: string;
};

export const authenticateWithBiometric = async (): Promise<BiometricResult> => {
  try {

    const optionsRes = await apiPost({
      url: API_WEBAUTHN_AUTH_OPTIONS,
      values: {},
    });

    if (!optionsRes?.success) {
      throw new Error("Failed to get biometric options");
    }

    const options = optionsRes.data;

    const authResponse = await startAuthentication(options);

    const verifyRes = await apiPost({
      url: API_WEBAUTHN_AUTH_VERIFY,
      values: authResponse,
    });

    if (!verifyRes?.success) {
      throw new Error("Biometric verification failed");
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Biometric authentication failed",
    };
  }
};

