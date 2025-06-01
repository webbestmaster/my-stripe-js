import dotenv from "dotenv";
import type {NextConfig} from "next";

// eslint-disable-next-line jest/require-hook
dotenv.config();

const nextConfig: NextConfig = {
    images: {
        deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
        // loader: "custom",
        // loaderFile: "./app/image/image-loader.ts",
        // deviceSizes: [320, 480, 640, 750],
        // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // images: {
    //     localPatterns: [
    //         {
    //             pathname: '/app/**',
    //             search: '',
    //         },
    //     ],
    // },
    // output: "export", // Check "out" folder
};

export default nextConfig;
