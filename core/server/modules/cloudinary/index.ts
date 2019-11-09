import {Router, Request, Response} from "express";
import * as cloudinary from 'cloudinary'


export interface CloudinaryConfig {
    cloudName: string,
    apiKey: string,
    apiSecret: string
}

export interface FormRequest extends Request{
    files: any;
}

export default (cloudinaryConfig: CloudinaryConfig): Router => {
    const moduleRootRouter = Router();


    cloudinary.config({
        cloud_name: cloudinaryConfig.cloudName,
        api_key: cloudinaryConfig.apiKey,
        api_secret: cloudinaryConfig.apiSecret
    });

    moduleRootRouter.route('/image-upload')
        .post((req: FormRequest, res: Response) => {
            const values = Object.values(req.files);
            const promises = values.map((image: {path: string}) => cloudinary.uploader.upload(image.path));

            Promise
                .all(promises)
                .then(results => res.json(results))
                .catch(err => {
                    res.status(500).json({ error: err });
                })
        });

    return moduleRootRouter;
}
