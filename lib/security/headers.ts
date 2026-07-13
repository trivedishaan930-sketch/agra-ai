import { NextResponse } from "next/server";
import { securityConfig } from "@/config/security.config";

function buildContentSecurityPolicy() {
  return Object.entries(securityConfig.contentSecurityPolicy.directives)
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");
}

export function applySecurityHeaders(response: NextResponse) {
  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy());
  response.headers.set("X-Frame-Options", securityConfig.headers.frameOptions);
  response.headers.set("X-Content-Type-Options", securityConfig.headers.contentTypeOptions);
  response.headers.set("Referrer-Policy", securityConfig.headers.referrerPolicy);
  response.headers.set("Permissions-Policy", securityConfig.headers.permissionsPolicy);
  response.headers.set("X-XSS-Protection", "0");
  return response;
}
