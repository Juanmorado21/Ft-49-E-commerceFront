/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: "http.mlstatic.com",
            },
            {
                hostname: "cdn-icons-png.flaticon.com",
            },
            {
                hostname: "images.pexels.com",
            },
            {
                hostname: "images.vexels.com",

            },
            {
                hostname: "st2.depositphotos.com"
            },
            {
                hostname: "cdn.computerhoy.com"
            }
        ],
    },
    compiler :{
        styledComponents: true
    }
};

export default nextConfig;
