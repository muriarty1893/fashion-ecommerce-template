import crypto from "crypto";

const CHECKOUT_INITIALIZE_PATH =
  "/payment/iyzipos/checkoutform/initialize/auth/ecom";
const CHECKOUT_RETRIEVE_PATH = "/payment/iyzipos/checkoutform/auth/ecom/detail";

type IyzicoConfig = {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
};

export type IyzicoInitializeRequest = {
  locale: "tr" | "en";
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: "TRY";
  basketId: string;
  paymentGroup: "PRODUCT";
  callbackUrl: string;
  enabledInstallments: number[];
  buyer: {
    id: string;
    name: string;
    surname: string;
    identityNumber: string;
    email: string;
    gsmNumber: string;
    registrationAddress: string;
    city: string;
    country: string;
    zipCode: string;
    ip: string;
  };
  shippingAddress: {
    address: string;
    zipCode: string;
    contactName: string;
    city: string;
    country: string;
  };
  billingAddress: {
    address: string;
    zipCode: string;
    contactName: string;
    city: string;
    country: string;
  };
  basketItems: Array<{
    id: string;
    price: string;
    name: string;
    category1: string;
    category2: string;
    itemType: "PHYSICAL";
  }>;
};

export type IyzicoInitializeResponse = {
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  conversationId?: string;
  token?: string;
  paymentPageUrl?: string;
  checkoutFormContent?: string;
  signature?: string;
  [key: string]: unknown;
};

export type IyzicoRetrieveResponse = {
  status?: string;
  errorCode?: string;
  errorMessage?: string;
  conversationId?: string;
  token?: string;
  paymentStatus?: string;
  fraudStatus?: number;
  paymentId?: string;
  [key: string]: unknown;
};

const getConfig = (): IyzicoConfig => {
  const apiKey = process.env.IYZICO_API_KEY;
  const secretKey = process.env.IYZICO_SECRET_KEY;
  const baseUrl = process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";

  if (!apiKey || !secretKey) {
    throw new Error(
      "iyzico sandbox keys are missing. Set IYZICO_API_KEY and IYZICO_SECRET_KEY.",
    );
  }

  return { apiKey, secretKey, baseUrl };
};

const createAuthorization = (
  config: IyzicoConfig,
  path: string,
  body: Record<string, unknown>,
) => {
  const randomKey = `${process.hrtime.bigint()}${Math.random().toString(16).slice(2)}`;
  const signature = crypto
    .createHmac("sha256", config.secretKey)
    .update(`${randomKey}${path}${JSON.stringify(body)}`)
    .digest("hex");

  const authorizationParams = [
    `apiKey:${config.apiKey}`,
    `randomKey:${randomKey}`,
    `signature:${signature}`,
  ].join("&");

  return {
    authorization: `IYZWSv2 ${Buffer.from(authorizationParams).toString("base64")}`,
    randomKey,
  };
};

const postIyzico = async <T extends Record<string, unknown>>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> => {
  const config = getConfig();
  const { authorization, randomKey } = createAuthorization(config, path, body);
  const response = await fetch(`${config.baseUrl}${path}`, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
      "x-iyzi-rnd": randomKey,
      "x-iyzi-client-version": "fashion-demo-next",
    },
    body: JSON.stringify(body),
  });

  const result = (await response.json()) as T;
  if (!response.ok) {
    const message =
      typeof result.errorMessage === "string"
        ? result.errorMessage
        : "iyzico request failed";
    throw new Error(message);
  }

  return result;
};

export const initializeIyzicoCheckout = (request: IyzicoInitializeRequest) =>
  postIyzico<IyzicoInitializeResponse>(
    CHECKOUT_INITIALIZE_PATH,
    request as unknown as Record<string, unknown>,
  );

export const retrieveIyzicoCheckout = (token: string, conversationId?: string) =>
  postIyzico<IyzicoRetrieveResponse>(CHECKOUT_RETRIEVE_PATH, {
    locale: "tr",
    token,
    ...(conversationId ? { conversationId } : {}),
  });
