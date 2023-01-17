
import  SanityClient  from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";

export const client = SanityClient({
    projectId:"et6m18cs",
    dataset:"production",
    apiVersion:"2023-01-10",
    useCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});


const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);