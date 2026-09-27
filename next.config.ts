import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 exige a allowlist explícita de qualidades de otimização de imagem.
    qualities: [75, 82, 88],
  },
};

export default nextConfig;
