import { describe, it, expect } from "vitest";
import {
  CANONICAL_HOST,
  getCanonicalRedirectUrl,
  type LocationLike,
} from "@/lib/canonicalRedirect";

const make = (overrides: Partial<LocationLike>): LocationLike => ({
  hostname: "",
  pathname: "/",
  search: "",
  hash: "",
  protocol: "https:",
  ...overrides,
});

// Toutes les routes internes définies dans App.tsx + quelques exemples dynamiques
const INTERNAL_ROUTES = [
  "/",
  "/mentions-legales",
  "/politique-confidentialite",
  "/cgv",
  "/guide-pathologies",
  "/business",
  "/bienfaits",
  "/produit/spirulina-plus-capsule",
  "/produit/ganoderma-plus-capsule",
  "/offre/scanner-qrma",
  "/offre/detox-bains-de-pieds-ioniques",
  "/page-inexistante",
];

const PUBLISHED_LOVABLE_HOSTS = [
  "greenworldprestige.lovable.app",
  "my-project.lovable.app",
];

describe("getCanonicalRedirectUrl — depuis *.lovable.app", () => {
  for (const host of PUBLISHED_LOVABLE_HOSTS) {
    for (const path of INTERNAL_ROUTES) {
      it(`redirige ${host}${path} vers https://${CANONICAL_HOST}${path}`, () => {
        const target = getCanonicalRedirectUrl(
          make({ hostname: host, pathname: path })
        );
        expect(target).toBe(`https://${CANONICAL_HOST}${path}`);
      });
    }
  }

  it("préserve la query string et le hash", () => {
    const target = getCanonicalRedirectUrl(
      make({
        hostname: "greenworldprestige.lovable.app",
        pathname: "/produit/spirulina-plus-capsule",
        search: "?ref=newsletter&utm=mail",
        hash: "#bienfaits",
      })
    );
    expect(target).toBe(
      `https://${CANONICAL_HOST}/produit/spirulina-plus-capsule?ref=newsletter&utm=mail#bienfaits`
    );
  });
});

describe("getCanonicalRedirectUrl — pas de redirection", () => {
  it("ne redirige pas depuis le domaine canonique en HTTPS", () => {
    expect(
      getCanonicalRedirectUrl(
        make({ hostname: CANONICAL_HOST, pathname: "/cgv" })
      )
    ).toBeNull();
  });

  it("ne redirige pas depuis www.greenworldprestige.com en HTTPS", () => {
    expect(
      getCanonicalRedirectUrl(
        make({ hostname: `www.${CANONICAL_HOST}`, pathname: "/" })
      )
    ).toBeNull();
  });

  it("ne redirige pas depuis le preview Lovable (id-preview--*)", () => {
    expect(
      getCanonicalRedirectUrl(
        make({
          hostname: "id-preview--abc123.lovable.app",
          pathname: "/bienfaits",
        })
      )
    ).toBeNull();
  });

  it("ne redirige pas depuis lovableproject.com (sandbox)", () => {
    expect(
      getCanonicalRedirectUrl(
        make({
          hostname: "abc123.lovableproject.com",
          pathname: "/bienfaits",
        })
      )
    ).toBeNull();
  });

  it("ne redirige pas depuis localhost", () => {
    expect(
      getCanonicalRedirectUrl(
        make({ hostname: "localhost", pathname: "/", protocol: "http:" })
      )
    ).toBeNull();
  });

  it("ne redirige pas depuis 127.0.0.1", () => {
    expect(
      getCanonicalRedirectUrl(
        make({ hostname: "127.0.0.1", pathname: "/", protocol: "http:" })
      )
    ).toBeNull();
  });
});

describe("getCanonicalRedirectUrl — HTTP → HTTPS sur le domaine canonique", () => {
  it("force HTTPS depuis http://greenworldprestige.com", () => {
    const target = getCanonicalRedirectUrl(
      make({
        hostname: CANONICAL_HOST,
        pathname: "/produit/ganoderma-plus-capsule",
        protocol: "http:",
      })
    );
    expect(target).toBe(
      `https://${CANONICAL_HOST}/produit/ganoderma-plus-capsule`
    );
  });

  it("force HTTPS depuis http://www.greenworldprestige.com", () => {
    const target = getCanonicalRedirectUrl(
      make({
        hostname: `www.${CANONICAL_HOST}`,
        pathname: "/",
        protocol: "http:",
      })
    );
    expect(target).toBe(`https://www.${CANONICAL_HOST}/`);
  });
});
