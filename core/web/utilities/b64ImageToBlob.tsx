export default async (b64Image: any) => {
    const response = await fetch(b64Image);
    const blob = await response.blob();
    return blob;
}
